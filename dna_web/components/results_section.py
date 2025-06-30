"""Componente de sección de resultados para la aplicación DNA Web."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def results_section() -> rx.Component:
    """Sección de resultados."""
    return rx.vstack(
        rx.cond(
            DNAAnalyzer.rna_result != "",
            rx.vstack(
                rx.text("RNA", font_weight="bold"),
                rx.text_area(
                    value=DNAAnalyzer.rna_result,
                    read_only=True,
                    rows="3",
                    width="100%",
                ),
                width="100%",
                align="start",
            ),
        ),
        rx.cond(
            DNAAnalyzer.protein_letters != "",
            rx.vstack(
                rx.text("Single letter chain", font_weight="bold"),
                rx.text_area(
                    value=DNAAnalyzer.protein_letters,
                    read_only=True,
                    rows="3",
                    width="100%",
                ),
                rx.text("Three letter chain", font_weight="bold", margin_top="1rem"),
                rx.text_area(
                    value=DNAAnalyzer.protein_three_letter,
                    read_only=True,
                    rows="3",
                    width="100%",
                ),
                rx.text(
                    "Full name chain", font_weight="bold", margin_top="1rem"
                ),
                rx.text_area(
                    value=DNAAnalyzer.protein_full_names,
                    read_only=True,
                    rows="3",
                    width="100%",
                ),
                width="100%",
                align="start",
            ),
        ),
        width="100%",
        align="start",
        spacing="4",
    )