"""Entry point for the DNA Web application."""

import reflex as rx
from dna_web.pages import index, guide
from dna_web.state import DNAAnalyzer

# Configuración de la aplicación
app = rx.App()
app.add_page(index, route="/")
app.add_page(guide, route="/guide")
