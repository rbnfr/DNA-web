"""Guide page for the DNA Web application."""

import reflex as rx
from dna_web.components.base_template import base_template


@base_template
def guide() -> rx.Component:
    """Guide page with functionality description and usage instructions."""
    return rx.vstack(
        # Header
        rx.heading(
            "DNA Web - User Guide",
            size="8",
            margin_bottom="2rem",
            text_align="center",
        ),

        # Overview section
        rx.vstack(
            rx.heading("🧬 Overview", size="6", margin_bottom="1rem"),
            rx.text(
                "DNA Web is a powerful tool for molecular biologists, geneticists, and students to analyze DNA sequences. "
                "It provides an intuitive interface for DNA sequence analysis, transcription, translation, and protein property calculation.",
                font_size="1.1rem",
                line_height="1.6",
            ),
            width="100%",
            align="start",
            margin_bottom="2rem",
        ),

        # Features section
        rx.vstack(
            rx.heading("✨ Features", size="6", margin_bottom="1rem"),
            rx.vstack(
                rx.heading("DNA Sequence Input", size="4", color="blue"),
                rx.unordered_list(
                    rx.list_item("Manual DNA sequence entry with automatic validation (only A, C, T, G allowed)"),
                    rx.list_item("Random sequence generation with customizable length"),
                    rx.list_item("File upload support for .txt and .fasta formats"),
                    margin_left="1rem",
                ),

                rx.heading("Analysis Tools", size="4", color="blue", margin_top="1.5rem"),
                rx.unordered_list(
                    rx.list_item("DNA to RNA Transcription: Convert DNA sequences to their RNA complement"),
                    rx.list_item("DNA to Protein Translation: Translate DNA sequences to amino acid chains using the standard genetic code"),
                    rx.list_item("Mutation Simulation: Introduce random mutations with adjustable frequency"),
                    margin_left="1rem",
                ),

                rx.heading("Protein Information", size="4", color="blue", margin_top="1.5rem"),
                rx.unordered_list(
                    rx.list_item("Single-letter amino acid notation"),
                    rx.list_item("Three-letter amino acid notation"),
                    rx.list_item("Full amino acid names"),
                    rx.list_item("Molecular weight calculation"),
                    rx.list_item("Isoelectric point (pI) determination"),
                    rx.list_item("Net charge at pH 7"),
                    rx.list_item("Hydrophobicity score"),
                    rx.list_item("Sequence length"),
                    margin_left="1rem",
                ),
                width="100%",
                align="start",
            ),
            width="100%",
            align="start",
            margin_bottom="2rem",
        ),

        # How to use section
        rx.vstack(
            rx.heading("🚀 How to Use", size="6", margin_bottom="1rem"),
            rx.ordered_list(
                rx.list_item(
                    rx.vstack(
                        rx.text("Input a DNA sequence", font_weight="bold"),
                        rx.text("You can:"),
                        rx.unordered_list(
                            rx.list_item("Type or paste a DNA sequence manually"),
                            rx.list_item("Generate a random sequence (optionally specify length)"),
                            rx.list_item("Upload a .txt or .fasta file containing the sequence"),
                            margin_left="1rem",
                        ),
                        align="start",
                    )
                ),
                rx.list_item(
                    rx.vstack(
                        rx.text("Select translation type", font_weight="bold"),
                        rx.unordered_list(
                            rx.list_item("ARN: For DNA to RNA transcription"),
                            rx.list_item("Protein: For DNA to protein translation"),
                            margin_left="1rem",
                        ),
                        align="start",
                    )
                ),
                rx.list_item(
                    rx.vstack(
                        rx.text("Optional: Enable mutations", font_weight="bold"),
                        rx.text("Toggle the mutations switch and set a frequency percentage to simulate genetic mutations in your sequence."),
                        align="start",
                    )
                ),
                rx.list_item(
                    rx.vstack(
                        rx.text("Click 'Translate'", font_weight="bold"),
                        rx.text("Process your sequence according to the selected options."),
                        align="start",
                    )
                ),
                rx.list_item(
                    rx.vstack(
                        rx.text("View results", font_weight="bold"),
                        rx.text("Results will appear in the right panel, including protein properties if applicable."),
                        align="start",
                    )
                ),
                margin_left="1rem",
                font_size="1rem",
            ),
            width="100%",
            align="start",
            margin_bottom="2rem",
        ),

        # Technical details section
        rx.vstack(
            rx.heading("📖 Technical Details", size="6", margin_bottom="1rem"),
            rx.vstack(
                rx.heading("DNA to RNA Transcription", size="4", color="blue"),
                rx.text("Converts DNA nucleotides to their RNA complements:", margin_bottom="0.5rem"),
                rx.unordered_list(
                    rx.list_item("A → U"),
                    rx.list_item("T → A"),
                    rx.list_item("G → C"),
                    rx.list_item("C → G"),
                    margin_left="1rem",
                ),

                rx.heading("DNA to Protein Translation", size="4", color="blue", margin_top="1.5rem"),
                rx.text(
                    "Translates DNA using the standard genetic code, processing codons (triplets of nucleotides) to amino acids. "
                    "Translation stops at stop codons (TAA, TAG, TGA).",
                    margin_bottom="0.5rem",
                ),

                rx.heading("Protein Properties Calculation", size="4", color="blue", margin_top="1.5rem"),
                rx.unordered_list(
                    rx.list_item("Molecular Weight: Calculated by summing the masses of individual amino acids plus water"),
                    rx.list_item("Isoelectric Point: The pH at which the protein has no net charge"),
                    rx.list_item("Net Charge: Calculated at physiological pH (7.0)"),
                    rx.list_item("Hydrophobicity: A measure of the protein's interaction with water"),
                    margin_left="1rem",
                ),
                width="100%",
                align="start",
            ),
            width="100%",
            align="start",
            margin_bottom="2rem",
        ),

        # Tips section
        rx.vstack(
            rx.heading("💡 Tips", size="6", margin_bottom="1rem"),
            rx.unordered_list(
                rx.list_item("Sequences are automatically validated - only A, C, T, G characters are accepted"),
                rx.list_item("File uploads support both plain text and FASTA format"),
                rx.list_item("Mutation frequency is expressed as a percentage (e.g., 5 = 5% mutation rate)"),
                rx.list_item("Results are displayed in real-time after clicking 'Translate'"),
                rx.list_item("Use 'Clear' to reset all fields and start over"),
                rx.list_item("The interface is responsive and works on both desktop and mobile devices"),
                margin_left="1rem",
                font_size="1rem",
            ),
            width="100%",
            align="start",
            margin_bottom="2rem",
        ),

        # Footer
        rx.divider(margin_y="2rem"),
        rx.text(
            "Built with ❤️ using Reflex framework",
            text_align="center",
            color="gray",
            font_style="italic",
        ),

        width="100%",
        max_width="800px",
        align="start",
        spacing="4",
        padding="2rem",
        padding_x=["1rem", "2rem", "4rem"],
    )
