"""Componente de sección de controles para la aplicación DNA Web."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def controls_section() -> rx.Component:
    """Sección de controles."""
    return rx.vstack(
        rx.text("Translation type", font_weight="bold"),
        rx.select(
            ["ARN", "Protein"],
            placeholder="Select type",
            value=DNAAnalyzer.conversion_type,
            on_change=DNAAnalyzer.set_conversion_type,
            width="100%",
        ),
        rx.hstack(
            rx.switch(
                checked=DNAAnalyzer.mutations_enabled,
                on_change=DNAAnalyzer.set_mutations_enabled,
            ),
            rx.text("Mutations"),
            align="center",
            margin_top="1rem",
        ),
        rx.input(
            placeholder="%",
            value=DNAAnalyzer.mutation_frequency,
            on_change=DNAAnalyzer.set_mutation_frequency,
            disabled=rx.cond(DNAAnalyzer.mutations_enabled, False, True),
            type="number",
            width="100%",
            margin_top="0.5rem",
        ),
        rx.button(
            "Translate",
            on_click=DNAAnalyzer.translate,
            color_scheme="blue",
            width="100%",
            margin_top="1rem",
        ),
        width="100%",
        align="start",
        spacing="2",
    )