"""Properties section for the DNA Web application."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def properties_section() -> rx.Component:
    """Properties section for proteins."""
    trasnsition_time = "0.5s"
    return rx.vstack(
        rx.heading(
            "Estimated protein properties", size="5", margin_bottom="1rem"
        ),
        rx.table.root(
            rx.table.body(
                rx.table.row(
                    rx.table.cell("Length", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_length),
                    _hover={"bg": "#338dff", "cursor": "default"},
                    transition=f"background-color {trasnsition_time} ease",
                ),
                rx.table.row(
                    rx.table.cell("Mass", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_mass),
                    _hover={"bg": "#338dff", "cursor": "default"},
                    transition=f"background-color {trasnsition_time} ease",
                ),
                rx.table.row(
                    rx.table.cell("Isoelectric point (pI)", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_pi),
                    _hover={"bg": "#338dff", "cursor": "default"},
                    transition=f"background-color {trasnsition_time} ease",
                ),
                rx.table.row(
                    rx.table.cell("Net charge", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_charge),
                    _hover={"bg": "#338dff", "cursor": "default"},
                    transition=f"background-color {trasnsition_time} ease",
                ),
                rx.table.row(
                    rx.table.cell("Hydrophobicity", font_weight="bold"),
                    rx.table.cell(DNAAnalyzer.protein_hydrophobicity),
                    _hover={"bg": "#338dff", "cursor": "default"},
                    transition=f"background-color {trasnsition_time} ease",
                ),
            ),
            size="1",
        ),
        width="100%",
        align="start",
    )
