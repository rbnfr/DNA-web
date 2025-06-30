"""Navigation component for the DNA Web application."""

import reflex as rx


def navbar() -> rx.Component:
    """Returns the navigation component."""
    return rx.box(
        rx.hstack(
            rx.heading("DNA Web", size="7", color="white"),
            justify="between",
            align="center",
            padding="1rem",
        ),
        background_color="blue",
        width="100%",
        margin_bottom="2rem",
    )
