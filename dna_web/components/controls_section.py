"""Controls section component for the DNA Web application."""

import reflex as rx
from dna_web.state.dna_analyzer import DNAAnalyzer


def controls_section() -> rx.Component:
    """Controls section."""
    return rx.vstack(
        rx.text("Translation type", font_weight="bold"),
        rx.select(
            ["ARN", "Protein"],
            default_value="ARN",
            placeholder="Select type",
            value=DNAAnalyzer.conversion_type,
            on_change=DNAAnalyzer.set_conversion_type,
            width="20%",
            margin_right="auto",
        ),
        rx.hstack(
            rx.switch(
                checked=DNAAnalyzer.mutations_enabled,
                on_change=DNAAnalyzer.set_mutations_enabled,
            ),
            rx.text("Mutations"),
            align="center",
            width="20%",
            margin_right="auto",
            margin_top="1rem",
        ),
        rx.input(
            placeholder="%",
            value=DNAAnalyzer.mutation_frequency,
            on_change=DNAAnalyzer.set_mutation_frequency,
            disabled=rx.cond(DNAAnalyzer.mutations_enabled, False, True),
            type="number",
            width="10%",
            margin_top="0.5rem",
            margin_right="auto",
        ),
        rx.button(
            "Translate",
            on_click=DNAAnalyzer.translate,
            color_scheme="blue",
            width="20%",
            margin_top="1rem",
            margin_left="auto",
            margin_right="auto",
        ),
        width="100%",
        align="start",
        spacing="2",
    )
