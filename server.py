import json
import os
import random
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

AMINOS = {
    "A": {
        "3letter": "Ala",
        "sc_mass": 15.0234,
        "pk1": 2.35,
        "pk2": 9.87,
        "sc_hphob": 0.5,
    },
    "R": {
        "3letter": "Arg",
        "sc_mass": 100.0873,
        "pk1": 1.82,
        "pk2": 8.99,
        "pk3": 12.48,
        "sc_hphob": 1.81,
    },
    "N": {
        "3letter": "Asn",
        "sc_mass": 58.0292,
        "pk1": 2.14,
        "pk2": 8.72,
        "sc_hphob": 0.85,
    },
    "D": {
        "3letter": "Asp",
        "sc_mass": 59.0132,
        "pk1": 1.99,
        "pk2": 9.9,
        "pk3": 3.9,
        "sc_hphob": 3.64,
    },
    "C": {
        "3letter": "Cys",
        "sc_mass": 46.9955,
        "pk1": 1.92,
        "pk2": 10.7,
        "pk3": 8.3,
        "sc_hphob": -0.02,
        "extco": 125,
    },
    "Q": {
        "3letter": "Gln",
        "sc_mass": 72.0448,
        "pk1": 2.17,
        "pk2": 9.13,
        "sc_hphob": 0.77,
    },
    "E": {
        "3letter": "Glu",
        "sc_mass": 73.0288,
        "pk1": 2.1,
        "pk2": 9.47,
        "pk3": 4.07,
        "sc_hphob": 3.63,
    },
    "G": {
        "3letter": "Gly",
        "sc_mass": 1.0078,
        "pk1": 2.35,
        "pk2": 9.78,
        "sc_hphob": 1.15,
    },
    "H": {
        "3letter": "His",
        "sc_mass": 81.0452,
        "pk1": 1.8,
        "pk2": 9.33,
        "pk3": 6.04,
        "sc_hphob": 2.33,
    },
    "I": {
        "3letter": "Ile",
        "sc_mass": 57.0702,
        "pk1": 2.32,
        "pk2": 9.76,
        "sc_hphob": -1.12,
    },
    "L": {
        "3letter": "Leu",
        "sc_mass": 57.0702,
        "pk1": 2.33,
        "pk2": 9.74,
        "sc_hphob": -1.25,
    },
    "K": {
        "3letter": "Lys",
        "sc_mass": 72.0811,
        "pk1": 2.16,
        "pk2": 9.06,
        "pk3": 10.54,
        "sc_hphob": 2.8,
    },
    "M": {
        "3letter": "Met",
        "sc_mass": 75.0267,
        "pk1": 2.13,
        "pk2": 9.28,
        "sc_hphob": -0.67,
    },
    "F": {
        "3letter": "Phe",
        "sc_mass": 91.0546,
        "pk1": 2.2,
        "pk2": 9.31,
        "sc_hphob": -1.71,
    },
    "P": {
        "3letter": "Pro",
        "sc_mass": 41.039,
        "pk1": 1.95,
        "pk2": 10.64,
        "sc_hphob": 0.14,
    },
    "S": {
        "3letter": "Ser",
        "sc_mass": 31.0183,
        "pk1": 2.19,
        "pk2": 9.21,
        "sc_hphob": 0.46,
    },
    "T": {
        "3letter": "Thr",
        "sc_mass": 45.0339,
        "pk1": 2.09,
        "pk2": 9.1,
        "sc_hphob": 0.25,
    },
    "W": {
        "3letter": "Trp",
        "sc_mass": 130.0655,
        "pk1": 2.46,
        "pk2": 9.41,
        "sc_hphob": -2.09,
        "extco": 5500,
    },
    "Y": {
        "3letter": "Tyr",
        "sc_mass": 107.0495,
        "pk1": 2.2,
        "pk2": 9.21,
        "pk3": 10.07,
        "sc_hphob": -0.71,
        "extco": 1490,
    },
    "V": {
        "3letter": "Val",
        "sc_mass": 43.0546,
        "pk1": 2.39,
        "pk2": 9.74,
        "sc_hphob": -0.46,
    },
}

CODON_TABLE = {
    "GCT": "A",
    "GCC": "A",
    "GCA": "A",
    "GCG": "A",
    "TGT": "C",
    "TGC": "C",
    "GAT": "D",
    "GAC": "D",
    "GAA": "E",
    "GAG": "E",
    "TTT": "F",
    "TTC": "F",
    "GGT": "G",
    "GGC": "G",
    "GGA": "G",
    "GGG": "G",
    "CAT": "H",
    "CAC": "H",
    "ATT": "I",
    "ATC": "I",
    "ATA": "I",
    "AAA": "K",
    "AAG": "K",
    "TTA": "L",
    "TTG": "L",
    "CTT": "L",
    "CTC": "L",
    "CTA": "L",
    "CTG": "L",
    "ATG": "M",
    "AAT": "N",
    "AAC": "N",
    "CCT": "P",
    "CCC": "P",
    "CCA": "P",
    "CCG": "P",
    "CAA": "Q",
    "CAG": "Q",
    "CGT": "R",
    "CGC": "R",
    "CGA": "R",
    "CGG": "R",
    "AGA": "R",
    "AGG": "R",
    "TCT": "S",
    "TCC": "S",
    "TCA": "S",
    "TCG": "S",
    "AGT": "S",
    "AGC": "S",
    "ACT": "T",
    "ACC": "T",
    "ACA": "T",
    "ACG": "T",
    "GTT": "V",
    "GTC": "V",
    "GTA": "V",
    "GTG": "V",
    "TGG": "W",
    "TAT": "Y",
    "TAC": "Y",
    "TAA": "_",
    "TAG": "_",
    "TGA": "_",
}


def dna_to_rna(seq):
    mapping = {"A": "U", "T": "A", "C": "G", "G": "C"}
    return "".join(mapping.get(c, "") for c in seq)


def mutate_chain(sequence, frequency):
    chars = ["A", "T", "C", "G"]
    freq_per = 100 / frequency
    i = 0
    seq = list(sequence)
    while i < len(seq):
        jump = int(random.random() * (random.random() * freq_per)) + 1
        i += jump
        if i < len(seq):
            seq[i] = random.choice(chars)
    return "".join(seq)


def translate_protein(seq):
    letters = []
    three = []
    names = []
    for i in range(0, len(seq) - 2, 3):
        codon = seq[i : i + 3]
        aa = CODON_TABLE.get(codon, "")
        if aa:
            letters.append(aa)
            if aa == "_":
                names.append("STOP")
                three.append("STOP")
            else:
                info = AMINOS[aa]
                names.append(info["3letter"])
                three.append(info["3letter"])
        else:
            # unknown codon, stop translation
            break
    return "".join(letters), "-|-".join(names), "-".join(three)


def count_aminos(sequence):
    counts = {k: 0 for k in AMINOS}
    for aa in sequence:
        if aa in counts:
            counts[aa] += 1
    return counts


def calc_mass(counts):
    mass = 18.0153  # add water
    for aa, count in counts.items():
        mass += AMINOS[aa]["sc_mass"] * count
    return round(mass, 2)


def net_charge(acids, bases, ph):
    c = 0.0
    for v in acids.values():
        if v["count"] > 0:
            c += -v["count"] / (1 + 10 ** (v["pk"] - ph))
    for v in bases.values():
        if v["count"] > 0:
            c += v["count"] / (1 + 10 ** (ph - v["pk"]))
    return c


def calc_properties(sequence):
    if not sequence:
        return {}

    counts = count_aminos(sequence)
    mass = calc_mass(counts)
    first = sequence[0]
    last = sequence[-1]

    acids = {
        "C-term": {"count": 1, "pk": AMINOS[first]["pk1"]},
        "D": {"count": counts["D"], "pk": AMINOS["D"].get("pk3", 0)},
        "E": {"count": counts["E"], "pk": AMINOS["E"].get("pk3", 0)},
        "C": {"count": counts["C"], "pk": AMINOS["C"].get("pk3", 0)},
        "Y": {"count": counts["Y"], "pk": AMINOS["Y"].get("pk3", 0)},
    }
    bases = {
        "N-term": {"count": 1, "pk": AMINOS[last]["pk2"]},
        "K": {"count": counts["K"], "pk": AMINOS["K"].get("pk3", 0)},
        "R": {"count": counts["R"], "pk": AMINOS["R"].get("pk3", 0)},
        "H": {"count": counts["H"], "pk": AMINOS["H"].get("pk3", 0)},
    }

    pI = 0.0
    for pH in [x / 100 for x in range(0, 1400)]:
        if net_charge(acids, bases, pH) <= 0:
            pI = pH
            break

    charge = round(net_charge(acids, bases, 7), 3)
    hydrophobicity = 7.9
    for aa, count in counts.items():
        hydrophobicity += count * AMINOS[aa]["sc_hphob"]
    hydrophobicity = round(hydrophobicity, 2)

    return {
        "length": len(sequence),
        "mass": mass,
        "pI": round(pI, 2),
        "charge": charge,
        "hydrophobicity": hydrophobicity,
    }


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve static files
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/translate":
            self.send_response(404)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"error": "Not found"}')
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length).decode("utf-8")) if length else {}

            seq = data.get("sequence", "").upper().replace(" ", "")
            trans_type = data.get("type", "RNA")
            mutate = data.get("mutate", False)
            freq = float(data.get("frequency", 0))

            if mutate and freq:
                seq = mutate_chain(seq, freq)

            if trans_type == "RNA":
                result = {"rna": dna_to_rna(seq)}
            else:
                letters, names, three = translate_protein(seq)
                props = calc_properties(letters) if letters else {}
                result = {
                    "letters": letters,
                    "names": names,
                    "three": three,
                    "properties": props,
                }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            self.wfile.write(json.dumps(result).encode("utf-8"))

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def run(server_class=HTTPServer, handler_class=Handler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Servidor ejecutándose en puerto {port}")
    print(f"Visita http://localhost:{port} para acceder a la aplicación")
    httpd.serve_forever()


if __name__ == "__main__":
    env_port = os.environ.get("PORT")
    arg_port = int(sys.argv[1]) if len(sys.argv) > 1 else None
    port = int(env_port or arg_port or 8000)
    run(port=port)
