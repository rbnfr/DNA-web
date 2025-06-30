"""Componente de sección de propiedades para la aplicación DNA Web."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def properties_section() -> rx.Component:
    """Sección de propiedades de proteínas."""
    return rx.vstack(
        rx.heading(
            "Estimated protein properties", size="5", margin_bottom="1rem"
        ),
        rx.table.root(
            rx.table.body(
                rx.table.row(
                    rx.table.cell("Length", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_length),
                ),
                rx.table.row(
                    rx.table.cell("Mass", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_mass),
                ),
                rx.table.row(
                    rx.table.cell("Isoelectric point (pI)", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_pi),
                ),
                rx.table.row(
                    rx.table.cell("Net charge", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_charge),
                ),
                rx.table.row(
                    rx.table.cell("Hydrophobicity", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_hydrophobicity),
                ),
            ),
            size="1",
        ),
        width="100%",
        align="start",
    )