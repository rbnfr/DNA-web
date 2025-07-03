"""Base template component for the DNA Web application."""

import reflex as rx
from functools import wraps
from dna_web.components.navbar import navbar


def base_template(page_func):
    """
    Decorator that wraps pages with common layout elements.
    """
    @wraps(page_func)
    def wrapper(*args, **kwargs) -> rx.Component:
        # Execute the original page function to get its content
        page_content = page_func(*args, **kwargs)

        return rx.box(
            navbar(),
            page_content,
            width="100%",
            min_height="100vh",
        )

    return wrapper
