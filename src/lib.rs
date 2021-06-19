mod utils;

use favannat::{
    matrix::{evaluator::MatrixEvaluator, fabricator::FeedForwardMatrixFabricator},
    network::{Evaluator, Fabricator, StatefulEvaluator, StatefulFabricator},
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

// #[wasm_bindgen]
// pub struct RGBA {
//     red: u8,
//     green: u8,
//     blue: u8,
//     alpha: u8,
// }

#[wasm_bindgen]
pub struct RGB {
    red: usize,
    green: usize,
    blue: usize,
}

#[wasm_bindgen]
impl RGB {
    pub fn red(&self) -> usize {
        self.red
    }
    pub fn green(&self) -> usize {
        self.green
    }
    pub fn blue(&self) -> usize {
        self.blue
    }
}

#[wasm_bindgen]
pub struct Population {
    individuals: Vec<Genome>,
    context: GenomeContext,
    functions: Vec<MatrixEvaluator>,
    result_buffer: Vec<u8>,
}

#[wasm_bindgen]
impl Population {
    pub fn new(size: usize) -> Self {
        let parameters = Parameters {
            structure: Structure {
                inputs: 2,
                inputs_connected_percent: 0.5,
                outputs: 4,
                outputs_activation: Activation::Sigmoid,
                weight_std_dev: 0.1,
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
            ],
            ..Default::default()
        };
        let mut context = GenomeContext::new(parameters);

        let mut individuals = Vec::with_capacity(size);

        for _ in 0..size {
            let mut genome = context.initialized_genome();
            for _ in 0..size {
                genome.mutate_with_context(&mut context);
            }
            individuals.push(genome)
        }

        let mut functions = Vec::with_capacity(size);

        for genome in &individuals {
            functions.push(FeedForwardMatrixFabricator::fabricate(genome).unwrap());
        }

        Self {
            individuals,
            context,
            functions,
            result_buffer: vec![],
        }
    }

    pub fn next_generation(&mut self, index_parent_0: usize, index_parent_1: usize) {
        let parent_0 = self.individuals[index_parent_0].clone();
        let parent_1 = self.individuals[index_parent_1].clone();
        let size = self.individuals.len();

        self.individuals.clear();

        for i in 0..size {
            let mut offspring = if i % 2 == 0 {
                parent_0.cross_in(&parent_1, &mut self.context.rng)
            } else {
                parent_1.cross_in(&parent_0, &mut self.context.rng)
            };

            offspring.mutate_with_context(&mut self.context);

            self.individuals.push(offspring)
        }

        self.functions.clear();

        for genome in &self.individuals {
            self.functions
                .push(FeedForwardMatrixFabricator::fabricate(genome).unwrap());
        }
    }

    pub fn probe_individual(&mut self, individual_index: usize, input_x: f64, input_y: f64) -> RGB {
        let output = self.functions[individual_index].evaluate(arr1(&[input_x, input_y]));

        RGB {
            red: (255.0 * output[[0]]) as usize,
            green: (255.0 * output[[1]]) as usize,
            blue: (255.0 * output[[2]]) as usize,
        }
    }

    pub fn probe_individual_complete(
        &mut self,
        individual_index: usize,
        dimension_x: f64,
        dimension_y: f64,
        resolution: usize,
    ) -> *const u8 {
        self.result_buffer.clear();

        let step_x = dimension_x / resolution as f64;
        let step_y = dimension_y / resolution as f64;

        let start = (resolution as f64 / -2.0) as isize;
        let end = (resolution as f64 / 2.0) as isize;

        for x in start..end {
            for y in start..end {
                let output = self.functions[individual_index]
                    .evaluate(arr1(&[step_x * x as f64, step_y * y as f64]));

                self.result_buffer.push((255.0 * output[[0]]) as u8);
                self.result_buffer.push((255.0 * output[[1]]) as u8);
                self.result_buffer.push((255.0 * output[[2]]) as u8);
                self.result_buffer.push((255.0 * output[[3]]) as u8);
            }
        }

        self.result_buffer.as_ptr()
    }
}
