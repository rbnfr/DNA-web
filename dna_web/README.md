# DNA Web

A modern web application for DNA sequence analysis and translation, built with [Reflex](https://reflex.dev/).

![DNA Web](https://img.shields.io/badge/DNA-Analysis-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🧬 Overview

DNA Web is a powerful tool for molecular biologists, geneticists, and students to analyze DNA sequences. It provides an intuitive interface for:

- DNA to RNA transcription
- DNA to protein translation
- Protein property analysis
- Sequence manipulation with mutations

## ✨ Features

### DNA Sequence Input
- Manual DNA sequence entry with automatic validation
- Random sequence generation with customizable length
- File upload support for .txt and .fasta formats

### Analysis Tools
- **DNA to RNA Transcription**: Convert DNA sequences to their RNA complement
- **DNA to Protein Translation**: Translate DNA sequences to amino acid chains using the standard genetic code
- **Mutation Simulation**: Introduce random mutations with adjustable frequency

### Protein Information
- Single-letter amino acid notation
- Three-letter amino acid notation
- Full amino acid names
- Detailed protein properties:
  - Molecular weight
  - Isoelectric point (pI)
  - Net charge at pH 7
  - Hydrophobicity score
  - Sequence length

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DNA-web.git
cd DNA-web
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
reflex run
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🏗️ Project Structure

The project follows the advanced Reflex application structure:

```
dna_web/
├── __init__.py        # Main package imports
├── dna_web.py         # Application entry point
├── components/        # UI components
│   ├── navbar.py
│   ├── input_section.py
│   ├── controls_section.py
│   ├── results_section.py
│   └── properties_section.py
├── pages/             # Application pages
│   └── index.py
└── state/             # Application state
    └── dna_analyzer.py
```

## 🧪 How It Works

1. **Input a DNA sequence** by typing, generating a random sequence, or uploading a file
2. **Select translation type** (RNA or Protein)
3. **Optional**: Enable mutations and set frequency
4. **Click "Translate"** to process the sequence
5. **View results** in the output section and protein properties table

## 📖 Technical Details

### DNA to RNA Transcription
Converts DNA nucleotides to their RNA complements:
- A → U
- T → A
- G → C
- C → G

### DNA to Protein Translation
Translates DNA using the standard genetic code, processing codons (triplets of nucleotides) to amino acids.

### Protein Properties Calculation
- **Molecular Weight**: Calculated by summing the masses of individual amino acids plus water
- **Isoelectric Point**: The pH at which the protein has no net charge
- **Net Charge**: Calculated at physiological pH (7.0)
- **Hydrophobicity**: A measure of the protein's interaction with water

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using [Reflex](https://reflex.dev/)