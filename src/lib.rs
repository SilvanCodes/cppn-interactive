mod utils;

use favannat::{
    matrix::{evaluator::MatrixEvaluator, fabricator::FeedForwardMatrixFabricator},
    network::{Evaluator, Fabricator},
};
use ndarray::arr1;
use set_genome::{
    activations::Activation, Genome, GenomeContext, Mutations, Parameters, Structure,
};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Individual {
    genome: Genome,
    evaluator: MatrixEvaluator,
    result_buffer: Vec<u8>,
}

impl Individual {
    pub fn new(genome: Genome) -> Self {
        Self {
            evaluator: FeedForwardMatrixFabricator::fabricate(&genome).unwrap(),
            result_buffer: Vec::new(),
            genome,
        }
    }
}

#[wasm_bindgen]
impl Individual {
    pub fn probe_complete(&mut self, size: f64, resolution: f64) -> *const u8 {
        self.result_buffer.clear();

        let step = size / resolution;

        let start = (resolution as f64 / -2.0) as isize;
        let end = (resolution as f64 / 2.0) as isize;

        for x in start..end {
            for y in start..end {
                let output = self
                    .evaluator
                    .evaluate(arr1(&[step * x as f64, step * y as f64]));

                self.result_buffer.push((255.0 * output[[0]]) as u8);
                self.result_buffer.push((255.0 * output[[1]]) as u8);
                self.result_buffer.push((255.0 * output[[2]]) as u8);
                // self.result_buffer.push((255.0 * output[[3]]) as u8);
                self.result_buffer.push(255);
            }
        }
        self.result_buffer.as_ptr()
    }
}

#[wasm_bindgen]
pub struct Population {
    individuals: Vec<Individual>,
    context: GenomeContext,
}

#[wasm_bindgen]
impl Population {
    pub fn new(size: usize, seed: usize) -> Self {
        let parameters = Parameters {
            seed: Some(seed as u64),
            structure: Structure {
                inputs: 2,
                inputs_connected_percent: 0.5,
                outputs: 3,
                outputs_activation: Activation::Sigmoid,
                weight_std_dev: 0.25,
                weight_cap: 1.0,
            },
            mutations: vec![
                Mutations::ChangeWeights {
                    chance: 0.1,
                    percent_perturbed: 0.1,
                },
                Mutations::ChangeActivation {
                    chance: 0.1,
                    activation_pool: vec![
                        Activation::Linear,
                        Activation::Sigmoid,
                        Activation::Tanh,
                        Activation::Gaussian,
                        Activation::Step,
                        Activation::Sine,
                        Activation::Cosine,
                        Activation::Inverse,
                        Activation::Absolute,
                        Activation::Relu,
                        Activation::Squared,
                    ],
                },
                Mutations::AddNode {
                    chance: 0.3,
                    activation_pool: vec![
                        Activation::Linear,
                        Activation::Sigmoid,
                        Activation::Tanh,
                        Activation::Gaussian,
                        Activation::Step,
                        Activation::Sine,
                        Activation::Cosine,
                        Activation::Inverse,
                        Activation::Absolute,
                        Activation::Relu,
                        Activation::Squared,
                    ],
                },
                Mutations::RemoveNode { chance: 0.15 },
                Mutations::AddConnection { chance: 0.5 },
                Mutations::RemoveConnection { chance: 0.25 },
                // Mutations::AddRecurrentConnection { chance: 0.01 },
            ], // ..Default::default()
        };
        let mut context = GenomeContext::new(parameters);

        let mut individuals = Vec::with_capacity(size);

        for _ in 0..size {
            let mut genome = context.initialized_genome();
            for _ in 0..size {
                genome.mutate_with_context(&mut context);
            }
            individuals.push(Individual::new(genome))
        }

        Self {
            individuals,
            context,
        }
    }

    pub fn next_generation(&mut self, index_parent_0: usize, index_parent_1: usize) {
        let parent_0 = self.individuals[index_parent_0].genome.clone();
        let parent_1 = self.individuals[index_parent_1].genome.clone();
        let size = self.individuals.len();

        self.individuals.clear();

        for i in 0..size {
            let mut offspring = if i % 2 == 0 {
                parent_0.cross_in(&parent_1, &mut self.context.rng)
            } else {
                parent_1.cross_in(&parent_0, &mut self.context.rng)
            };

            offspring.mutate_with_context(&mut self.context);

            self.individuals.push(Individual::new(offspring))
        }
    }

    pub fn probe_individual_complete(
        &mut self,
        index: usize,
        size: f64,
        resolution: f64,
    ) -> *const u8 {
        self.individuals[index].probe_complete(size, resolution)
    }
}
