import os
import subprocess
import glob

# Directory containing JSON schema files
schema_dir = "payloads"

# Output directory for generated Go files
output_dir = "pkg/payloads"

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Find all JSON schema files
schema_files = glob.glob(os.path.join(schema_dir, "*.json"))

for schema_file in schema_files:
    # Get base filename without extension
    base_name = os.path.splitext(os.path.basename(schema_file))[0]
    
    # Convert kebab-case to snake_case for Go file
    go_file = base_name.replace("-", "_") + "_generated.go"
    output_file = os.path.join(output_dir, go_file)
    
    # Run go-jsonschema generator
    cmd = [
        "go-jsonschema",
        "-p", "payloads", # Package name
        "-o", output_file,
        schema_file
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"Generated {output_file} from {schema_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error generating {output_file}: {e}")
