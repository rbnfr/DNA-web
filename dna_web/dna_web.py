"""Punto de entrada principal para la aplicación DNA Web."""

import reflex as rx
from dna_web.pages import index
from dna_web.state import DNAAnalyzer

# Configuración de la aplicación
app = rx.App()
app.add_page(index, route="/")
