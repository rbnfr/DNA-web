import random
from typing import Dict

import reflex as rx


class DNAAnalyzer(rx.State):
    """Main state of the DNA Web app"""

    # Amino-acid data
    AMINOS = {
        "A": {
            "3letter": "Ala",
            "fullname": "Alanine",
            "sc_mass": 15.0234,
            "pk1": 2.35,
            "pk2": 9.87,
            "sc_hphob": 0.5,
        },
        "R": {
            "3letter": "Arg",
            "fullname": "Arginine",
            "sc_mass": 100.0873,
            "pk1": 1.82,
            "pk2": 8.99,
            "pk3": 12.48,
            "sc_hphob": 1.81,
        },
        "N": {
            "3letter": "Asn",
            "fullname": "Asparagine",
            "sc_mass": 58.0292,
            "pk1": 2.14,
            "pk2": 8.72,
            "sc_hphob": 0.85,
        },
        "D": {
            "3letter": "Asp",
            "fullname": "Aspartic_Acid",
            "sc_mass": 59.0132,
            "pk1": 1.99,
            "pk2": 9.9,
            "pk3": 3.9,
            "sc_hphob": 3.64,
        },
        "C": {
            "3letter": "Cys",
            "fullname": "Cysteine",
            "sc_mass": 46.9955,
            "pk1": 1.92,
            "pk2": 10.7,
            "pk3": 8.3,
            "sc_hphob": -0.02,
            "extco": 125,
        },
        "Q": {
            "3letter": "Gln",
            "fullname": "Glutamine",
            "sc_mass": 72.0448,
            "pk1": 2.17,
            "pk2": 9.13,
            "sc_hphob": 0.77,
        },
        "E": {
            "3letter": "Glu",
            "fullname": "Glutamic_Acid",
            "sc_mass": 73.0288,
            "pk1": 2.1,
            "pk2": 9.47,
            "pk3": 4.07,
            "sc_hphob": 3.63,
        },
        "G": {
            "3letter": "Gly",
            "fullname": "Glycine",
            "sc_mass": 1.0078,
            "pk1": 2.35,
            "pk2": 9.78,
            "sc_hphob": 1.15,
        },
        "H": {
            "3letter": "His",
            "fullname": "Histidine",
            "sc_mass": 81.0452,
            "pk1": 1.8,
            "pk2": 9.33,
            "pk3": 6.04,
            "sc_hphob": 2.33,
        },
        "I": {
            "3letter": "Ile",
            "fullname": "Isoleucine",
            "sc_mass": 57.0702,
            "pk1": 2.32,
            "pk2": 9.76,
            "sc_hphob": -1.12,
        },
        "L": {
            "3letter": "Leu",
            "fullname": "Leucine",
            "sc_mass": 57.0702,
            "pk1": 2.33,
            "pk2": 9.74,
            "sc_hphob": -1.25,
        },
        "K": {
            "3letter": "Lys",
            "fullname": "Lysine",
            "sc_mass": 72.0811,
            "pk1": 2.16,
            "pk2": 9.06,
            "pk3": 10.54,
            "sc_hphob": 2.8,
        },
        "M": {
            "3letter": "Met",
            "fullname": "Methionine",
            "sc_mass": 75.0267,
            "pk1": 2.13,
            "pk2": 9.28,
            "sc_hphob": -0.67,
        },
        "F": {
            "3letter": "Phe",
            "fullname": "Phenylalanine",
            "sc_mass": 91.0546,
            "pk1": 2.2,
            "pk2": 9.31,
            "sc_hphob": -1.71,
        },
        "P": {
            "3letter": "Pro",
            "fullname": "Proline",
            "sc_mass": 41.039,
            "pk1": 1.95,
            "pk2": 10.64,
            "sc_hphob": 0.14,
        },
        "S": {
            "3letter": "Ser",
            "fullname": "Serine",
            "sc_mass": 31.0183,
            "pk1": 2.19,
            "pk2": 9.21,
            "sc_hphob": 0.46,
        },
        "T": {
            "3letter": "Thr",
            "fullname": "Threonine",
            "sc_mass": 45.0339,
            "pk1": 2.09,
            "pk2": 9.1,
            "sc_hphob": 0.25,
        },
        "W": {
            "3letter": "Trp",
            "fullname": "Tryptophan",
            "sc_mass": 130.0655,
            "pk1": 2.46,
            "pk2": 9.41,
            "sc_hphob": -2.09,
            "extco": 5500,
        },
        "Y": {
            "3letter": "Tyr",
            "fullname": "Tyrosine",
            "sc_mass": 107.0495,
            "pk1": 2.2,
            "pk2": 9.21,
            "pk3": 10.07,
            "sc_hphob": -0.71,
            "extco": 1490,
        },
        "V": {
            "3letter": "Val",
            "fullname": "Valine",
            "sc_mass": 43.0546,
            "pk1": 2.39,
            "pk2": 9.74,
            "sc_hphob": -0.46,
        },
    }

    # Codon table for translation
    CODON_TABLE = {
        "GCT": "A",
        "GCC": "A",
        "GCA": "A",
        "GCG": "A",
        "TGT": "C",
        "TGC": "C",
        "GAT": "D",
        "GAC": "D",
        "GAA": "E",
        "GAG": "E",
        "TTT": "F",
        "TTC": "F",
        "GGT": "G",
        "GGC": "G",
        "GGA": "G",
        "GGG": "G",
        "CAT": "H",
        "CAC": "H",
        "ATT": "I",
        "ATC": "I",
        "ATA": "I",
        "AAA": "K",
        "AAG": "K",
        "TTA": "L",
        "TTG": "L",
        "CTT": "L",
        "CTC": "L",
        "CTA": "L",
        "CTG": "L",
        "ATG": "M",
        "AAT": "N",
        "AAC": "N",
        "CCT": "P",
        "CCC": "P",
        "CCA": "P",
        "CCG": "P",
        "CAA": "Q",
        "CAG": "Q",
        "CGT": "R",
        "CGC": "R",
        "CGA": "R",
        "CGG": "R",
        "AGA": "R",
        "AGG": "R",
        "TCT": "S",
        "TCC": "S",
        "TCA": "S",
        "TCG": "S",
        "AGT": "S",
        "AGC": "S",
        "ACT": "T",
        "ACC": "T",
        "ACA": "T",
        "ACG": "T",
        "GTT": "V",
        "GTC": "V",
        "GTA": "V",
        "GTG": "V",
        "TGG": "W",
        "TAT": "Y",
        "TAC": "Y",
        "TAA": "_",
        "TAG": "_",
        "TGA": "_",
    }

    # Interface states
    dna_sequence: str = ""
    sequence_length_input: str = ""
    conversion_type: str = ""
    mutations_enabled: bool = False
    mutation_frequency: str = ""

    # Results
    rna_result: str = ""
    protein_letters: str = ""
    protein_three_letter: str = ""
    protein_full_names: str = ""

    # Protein properties
    protein_length: str = ""
    protein_mass: str = ""
    protein_pi: str = ""
    protein_charge: str = ""
    protein_hydrophobicity: str = ""

    @rx.var
    def sequence_length(self) -> str:
        """Calc and return the length of the DNA sequence."""
        return f"Length: {len(self.dna_sequence)}"

    def validate_dna_sequence(self, value: str):
        """Validates and filters the DNA sequence to contain only A, C, T, G."""
        filtered_sequence = "".join(
            char.upper() for char in value if char.upper() in ["A", "C", "T", "G"]
        )
        self.dna_sequence = filtered_sequence

    async def handle_file_upload(self, files: list[rx.UploadFile]):
        """Handles the upload of DNA sequence files."""
        for file in files:
            upload_data = await file.read()
            content = upload_data.decode("utf-8")

            # Filter only valid DNA characters from the file content
            filtered_sequence = "".join(
                char.upper() for char in content if char.upper() in ["A", "C", "T", "G"]
            )

            if filtered_sequence:
                self.dna_sequence = filtered_sequence
                yield rx.toast.success(
                    f"Loaded sequence: {len(filtered_sequence)} nucleotides"
                )
            else:
                yield rx.toast.error(
                    "No valid nucleotides found in the file. Please upload a valid DNA sequence file."
                )

    def generate_sequence(self):
        """Generates a random DNA sequence."""
        try:
            length = (
                int(self.sequence_length_input)
                if self.sequence_length_input
                else random.randint(3, 1000)
            )
        except ValueError:
            length = random.randint(3, 1000)

        chars = ["A", "T", "C", "G"]
        sequence = "".join(random.choice(chars) for _ in range(length))
        self.dna_sequence = sequence

    def clear_all(self):
        """Clear all fields."""
        self.dna_sequence = ""
        self.sequence_length_input = ""
        self.conversion_type = ""
        self.mutations_enabled = False
        self.mutation_frequency = ""
        self.rna_result = ""
        self.protein_letters = ""
        self.protein_three_letter = ""
        self.protein_full_names = ""
        self.protein_length = ""
        self.protein_mass = ""
        self.protein_pi = ""
        self.protein_charge = ""
        self.protein_hydrophobicity = ""

    def dna_to_rna(self, sequence: str) -> str:
        """Converts DNA to RNA."""
        mapping = {"A": "U", "T": "A", "C": "G", "G": "C"}
        return "".join(mapping.get(nucleotide, "") for nucleotide in sequence)

    def mutate_chain(self, sequence: str, frequency: float) -> str:
        """Applies mutations to the sequence."""
        chars = ["A", "T", "C", "G"]
        freq_per = 100 / frequency
        seq = list(sequence)
        i = 0
        while i < len(seq):
            jump = int(random.random() * (random.random() * freq_per)) + 1
            i += jump
            if i < len(seq):
                seq[i] = random.choice(chars)
        return "".join(seq)

    def translate_protein(self, seq: str) -> tuple[str, str, str]:
        """Translates DNA to protein."""
        letters = []
        three = []
        names = []

        for i in range(0, len(seq) - 2, 3):
            codon = seq[i : i + 3]
            aminoacid = self.CODON_TABLE.get(codon, "")
            if aminoacid:
                letters.append(aminoacid)
                if aminoacid == "_":
                    names.append("STOP")
                    three.append("STOP")
                else:
                    info = self.AMINOS[aminoacid]
                    names.append(info["fullname"])
                    three.append(info["3letter"])
            else:
                break

        return "".join(letters), "-|-".join(names), "-".join(three)

    def count_aminos(self, sequence: str) -> Dict[str, int]:
        """Counts the amino acids in the sequence."""
        counts = {k: 0 for k in self.AMINOS}
        for aa in sequence:
            if aa in counts:
                counts[aa] += 1
        return counts

    def calc_mass(self, counts: Dict[str, int]) -> float:
        """Calculates the molecular mass."""
        mass = 18.0153  # añadir agua
        for aa, count in counts.items():
            mass += self.AMINOS[aa]["sc_mass"] * count
        return round(mass, 2)

    def net_charge(self, acids: Dict, bases: Dict, ph: float) -> float:
        """Calculates the net charge."""
        c = 0.0
        for v in acids.values():
            if v["count"] > 0:
                c += -v["count"] / (1 + 10 ** (v["pk"] - ph))
        for v in bases.values():
            if v["count"] > 0:
                c += v["count"] / (1 + 10 ** (ph - v["pk"]))
        return c

    def calc_properties(self, sequence: str) -> Dict:
        """Calculates properties of the protein."""
        if not sequence:
            return {}

        counts = self.count_aminos(sequence)
        mass = self.calc_mass(counts)
        first = sequence[0] if sequence else ""
        last = sequence[-1] if sequence else ""

        if not first or not last or first not in self.AMINOS or last not in self.AMINOS:
            return {}

        acids = {
            "C-term": {"count": 1, "pk": self.AMINOS[first]["pk1"]},
            "D": {"count": counts["D"], "pk": self.AMINOS["D"].get("pk3", 0)},
            "E": {"count": counts["E"], "pk": self.AMINOS["E"].get("pk3", 0)},
            "C": {"count": counts["C"], "pk": self.AMINOS["C"].get("pk3", 0)},
            "Y": {"count": counts["Y"], "pk": self.AMINOS["Y"].get("pk3", 0)},
        }
        bases = {
            "N-term": {"count": 1, "pk": self.AMINOS[last]["pk2"]},
            "K": {"count": counts["K"], "pk": self.AMINOS["K"].get("pk3", 0)},
            "R": {"count": counts["R"], "pk": self.AMINOS["R"].get("pk3", 0)},
            "H": {"count": counts["H"], "pk": self.AMINOS["H"].get("pk3", 0)},
        }

        pI = 0.0
        for pH in [x / 100 for x in range(0, 1400)]:
            if self.net_charge(acids, bases, pH) <= 0:
                pI = pH
                break

        charge = round(self.net_charge(acids, bases, 7), 3)
        hydrophobicity = 7.9
        for aa, count in counts.items():
            hydrophobicity += count * self.AMINOS[aa]["sc_hphob"]
        hydrophobicity = round(hydrophobicity, 2)

        return {
            "length": len(sequence),
            "mass": mass,
            "pI": round(pI, 2),
            "charge": charge,
            "hydrophobicity": hydrophobicity,
        }

    def translate(self):
        """Translates according to the selected type."""
        if not self.dna_sequence:
            return

        if not self.conversion_type:
            return

        sequence = self.dna_sequence

        # Apply mutations if enabled
        if self.mutations_enabled and self.mutation_frequency:
            try:
                freq = float(self.mutation_frequency)
                if freq > 0:
                    sequence = self.mutate_chain(sequence, freq)
            except ValueError:
                pass

        if self.conversion_type == "ARN":
            self.rna_result = self.dna_to_rna(sequence)
            # Clear protein results
            self.protein_letters = ""
            self.protein_three_letter = ""
            self.protein_full_names = ""
            self.protein_length = ""
            self.protein_mass = ""
            self.protein_pi = ""
            self.protein_charge = ""
            self.protein_hydrophobicity = ""
        else:  # Protein
            letters, names, three = self.translate_protein(sequence)
            self.protein_letters = letters
            self.protein_full_names = names
            self.protein_three_letter = three

            # Calculate properties
            if letters:
                props = self.calc_properties(letters)
                self.protein_length = str(props.get("length", ""))
                self.protein_mass = (
                    f"{props.get('mass', '')} amu" if props.get("mass") else ""
                )
                self.protein_pi = str(props.get("pI", ""))
                self.protein_charge = str(props.get("charge", ""))
                self.protein_hydrophobicity = str(props.get("hydrophobicity", ""))

            # Clear RNA result
            self.rna_result = ""