"""Componente de barra de navegación para la aplicación DNA Web."""

import reflex as rx


def navbar() -> rx.Component:
    """Devuelve el componente de barra de navegación."""
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