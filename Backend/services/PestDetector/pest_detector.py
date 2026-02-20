"""
Pest Detection Module using YOLOv5 (PyTorch Hub) with Custom Local Repository and Weights
"""

import os
import sys
from pathlib import Path
import torch
from PIL import Image

# Global model instance
_model = None

def init_model():
    """Initialize the YOLOv5 model using custom local repository and weights"""
    global _model
    
    if _model is not None:
        return _model
    
    try:
        model_path = Path(__file__).parent / 'krishisahai_yolo_final.pt'
        
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        print(f"Loading YOLO pest detection model from {model_path}")
        
        # Use ultralytics YOLO for more robust loading
        _model = YOLO(str(model_path))
        
        # Load class names
        if not _classes:
            load_classes()
        
        print("Pest detection model loaded successfully")
        return _model
        
    except Exception as e:
        print(f"Error loading pest detection model: {e}")
        import traceback
        traceback.print_exc()
        return None

def predict(image_path):
    """
    Predict pest from image using YOLOv5
    
    Args:
        image_path: Path to the image file
        
    Returns:
        dict with pest_name, confidence, and severity
    """
    global _model
    
    try:
        # Initialize model if needed
        if _model is None:
            init_model()
            
        if _model is None:
            return {
                'pest_name': 'Service Unavailable',
                'confidence': 0.0,
                'severity': 'none',
                'description': 'Pest detection model failed to load. Please check server logs.'
            }
        
        # Load image
        try:
            img = Image.open(image_path)
        except Exception as e:
             return {
                'pest_name': 'Error',
                'confidence': 0.0,
                'severity': 'unknown',
                'description': f'Failed to open image: {str(e)}'
            }
        
        # Run inference
        results = _model(img)
        
        # Get predictions as pandas dataframe
        # xyxy[0] contains detections: xmin, ymin, xmax, ymax, confidence, class, name
        df = results.pandas().xyxy[0]
        
        # Check if any detections found
        if df.empty:
            return {
                'pest_name': 'No Pest Detected',
                'confidence': 0.0,
                'severity': 'none',
                'description': 'No pests were detected in the image.'
            }
        
        # Get detection with highest confidence
        df_sorted = df.sort_values('confidence', ascending=False)
        best_detection = df_sorted.iloc[0]
        
        pest_name = best_detection['name']
        confidence = float(best_detection['confidence'])
        
        # Determine severity based on confidence
        if confidence > 0.8:
            severity = 'high'
        elif confidence > 0.5:
            severity = 'medium'
        else:
            severity = 'low'
        
        return {
            'pest_name': pest_name,
            'confidence': confidence,
            'severity': severity,
            'description': f"Detected {pest_name} with {confidence*100:.1f}% confidence."
        }
        
    except Exception as e:
        print(f"Error during pest prediction: {e}")
        import traceback
        traceback.print_exc()
        return {
            'pest_name': 'Error',
            'confidence': 0.0,
            'severity': 'unknown',
            'description': f'Error during detection: {str(e)}'
        }

# Warm up the model on import
try:
    print("Initializing pest detection model...")
    init_model()
except Exception as e:
    print(f"Warning: Could not initialize pest detection model: {e}")
