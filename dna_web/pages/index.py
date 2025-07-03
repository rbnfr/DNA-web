"""Main page of the DNA Web application."""

import reflex as rx
from dna_web.components.base_template import base_template
from dna_web.components.input_section import input_section
from dna_web.components.controls_section import controls_section
from dna_web.components.results_section import results_section
from dna_web.components.properties_section import properties_section


@base_template
def index() -> rx.Component:
    """Main page of the DNA Web application."""
    return rx.flex(
        # Left column: Input + Controls
        rx.box(
            input_section(),
            controls_section(),
            width="66%",
            padding_right="1rem",
            overflow="auto",
        ),
        # Separator
        rx.box(
            width="4px",
            height="100%",
            bg="#343374",
            cursor="col-resize",
            _hover={"bg": "white"},
            position="relative",
            z_index="1",
            style={
                "resize": "horizontal",
                "user-select": "none",
                "min-width": "4px",
                "max-width": "4px",
            },
        ),
        # Right column: Results + Properties
        rx.box(
            results_section(),
            properties_section(),
            width="34%",
            padding_left="1rem",
            overflow="auto",
        ),
        direction="row",
        width="100%",
        height="calc(100vh - 120px)",
        position="relative",
        padding="2rem",
    )
