"""Input section component for the DNA Web application."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def input_section() -> rx.Component:
    """Input data section."""
    return rx.vstack(
        rx.text("DNA Sequence", font_weight="bold"),
        rx.text_area(
            placeholder="Only A, C, T, G allowed",
            value=DNAAnalyzer.dna_sequence,
            on_change=DNAAnalyzer.validate_dna_sequence,
            rows="5",
            width="100%",
        ),
        rx.text(
            DNAAnalyzer.sequence_length,
            font_size="0.875rem",
            color="gray",
        ),
        rx.hstack(
            rx.button(
                "Generate sequence",
                on_click=DNAAnalyzer.generate_sequence,
                variant="soft",
                margin_right="0.5rem",
            ),
            rx.button(
                "Clear",
                on_click=DNAAnalyzer.clear_all,
                variant="soft",
                margin_right="0.5rem",
            ),
            rx.input(
                placeholder="Length (optional)",
                value=DNAAnalyzer.sequence_length_input,
                on_change=DNAAnalyzer.set_sequence_length_input,
                type="number",
                width="120px",
            ),
            width="100%",
            margin_top="1rem",
        ),
        rx.vstack(
            rx.text("Load from file", font_weight="bold", margin_top="1rem"),
            rx.upload(
                rx.vstack(
                    rx.button(
                        "Select sequence file",
                        color="rgb(107, 99, 246)",
                        bg="white",
                        border="1px solid rgb(107, 99, 246)",
                        margin_left="auto",
                        margin_right="auto",
                    ),
                    rx.text(
                        "Drag a .txt or .fasta file here",
                        font_size="0.875rem",
                        color="gray",
                        margin_left="auto",
                        margin_right="auto",
                    ),
                ),
                id="upload_dna",
                border="1px dotted rgb(107, 99, 246)",
                padding="2em",
                width="100%",
                accept={
                    "text/plain": [".txt"],
                    "text/x-fasta": [".fasta", ".fa", ".fas"],
                },
            ),
            rx.button(
                "Load file",
                on_click=DNAAnalyzer.handle_file_upload(
                    rx.upload_files(upload_id="upload_dna")
                ),
                color_scheme="blue",
                width="20%",
                margin_top="0.5rem",
                margin_left="auto",
                margin_right="auto",
            ),
            width="100%",
            align="start",
        ),
        width="100%",
        align="start",
        spacing="2",
    )
