"""Navigation component for the DNA Web application."""

import reflex as rx


def navbar() -> rx.Component:
    """Returns the navigation component."""
    return rx.box(
        rx.hstack(
            rx.heading("DNA Web", size="7", color="white"),
            rx.hstack(
                rx.link(
                    "Home",
                    href="/",
                    color="white",
                    font_weight="500",
                    _hover={"text_decoration": "underline"},
                ),
                rx.link(
                    "Guide",
                    href="/guide",
                    color="white",
                    font_weight="500",
                    _hover={"text_decoration": "underline"},
                ),
                rx.color_mode.button(),
                spacing="6",
            ),
            justify="between",
            align="center",
            padding="1rem",
            width="100%",
        ),

        background_color="blue",
        width="100%",
        margin_bottom="2rem",
    )
