
import type { Option } from './types';

export const LIGHTING_OPTIONS: Option[] = [
  { id: 'Natural Light', label: 'Natural Light' },
  { id: 'Studio Light', label: 'Studio Light' },
  { id: 'Golden Hour', label: 'Golden Hour' },
  { id: 'Blue Hour', label: 'Blue Hour' },
  { id: 'Cinematic', label: 'Cinematic' },
  { id: 'Dramatic', label: 'Dramatic' },
];

export const CAMERA_ANGLE_OPTIONS: Option[] = [
  { id: 'Front View', label: 'Front View' },
  { id: 'Side View', label: 'Side View' },
  { id: 'Top View', label: 'Top View' },
  { id: '45° Angle', label: '45° Angle' },
  { id: 'Close-up', label: 'Close-up' },
  { id: 'Macro Shot', label: 'Macro Shot' },
];

export const GEMINI_PROMPT: string = `Generate a photorealistic, ultra-high-quality image of the uploaded product, using the visual style, lighting mood, and atmosphere of the reference image. Apply the selected lighting type and camera angle precisely. Maintain the product’s original details while reflecting the reference’s aesthetic. The result should be professional, cohesive, and visually realistic — ready for marketing use.`;
