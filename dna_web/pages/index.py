"""Main page of the DNA Web application."""

import reflex as rx
from dna_web.components.navbar import navbar
from dna_web.components.input_section import input_section
from dna_web.components.controls_section import controls_section
from dna_web.components.results_section import results_section
from dna_web.components.properties_section import properties_section


def index() -> rx.Component:
    """Main page of the DNA Web application."""
    return rx.container(
        navbar(),
        rx.grid(
            input_section(),
            controls_section(),
            columns="2fr 1fr",
            spacing="4",
            margin_bottom="2rem",
        ),
        rx.grid(
            results_section(),
            properties_section(),
            columns="2fr 1fr",
            spacing="4",
        ),
        max_width="1200px",
        padding="1rem",
    )
