from graphviz import Digraph

# Création du diagramme d'architecture modulaire de Solia
dot = Digraph(comment='Architecture Modulaire de Solia')
dot.attr(rankdir='LR', size='10,8')

# Blocs principaux
modules = {
    "UI Frontend": ["React", "Tailwind", "Formulaires dynamiques", "Dashboard (Opérateur, Manager, Association)"],
    "API Gateway": ["Fastify", "Swagger", "Multi-tenant", "Authentification JWT", "Gestion des rôles"],
    "IA Layer": ["Script IA", "Coaching IA", "Optimisation missions", "Transcription", "Feedback live"],
    "Téléphonie": ["WebRTC/VOIP", "Appels sortants/entrants", "Enregistrement", "Scripts dynamiques"],
    "Formulaires": ["Saisie sécurisée", "Validation temps réel", "Partiels/Complets", "Offline sync"],
    "CRM": ["Historique donateur", "Suivi prospects", "Segmentation", "Campagnes automatisées"],
    "Facturation": ["70/30 Paiement", "Stripe", "Factures auto", "Suivi 77K€ auto-entrepreneur"],
    "Logistique": ["Suivi matériel", "Caution", "État mission", "Alertes"],
    "API Publique": ["Droits API", "OAuth 2.0", "Audit logs", "Connecteurs tiers"],
    "Chat/Formation": ["Chat interne", "Modules de coaching", "Gamification", "Mentoring"]
}

# Ajout des noeuds
for module, components in modules.items():
    label = f"{module}\n" + "\n".join(components)
    dot.node(module, label=label, shape='box', style='filled', fillcolor='lightblue')

# Relations principales entre blocs
edges = [
    ("UI Frontend", "API Gateway"),
    ("API Gateway", "IA Layer"),
    ("API Gateway", "Téléphonie"),
    ("API Gateway", "Formulaires"),
    ("API Gateway", "CRM"),
    ("API Gateway", "Facturation"),
    ("API Gateway", "Logistique"),
    ("API Gateway", "API Publique"),
    ("API Gateway", "Chat/Formation"),
    ("Téléphonie", "Formulaires"),
    ("IA Layer", "Téléphonie"),
    ("IA Layer", "CRM"),
    ("CRM", "Facturation"),
    ("Logistique", "Facturation"),
    ("Chat/Formation", "CRM")
]

for src, dst in edges:
    dot.edge(src, dst)

# Regénération du schéma avec focus visuel sur les modules 7 à 9 (Facturation, Logistique, API Publique)
dot.render('architecture_modulaire_solia_7_8_9', format='png', cleanup=False)

# Ajout du module 10 — Chat & Formation (Support + Apprentissage)
module_10 = "Chat & Formation"
components_10 = [
    "Chat interne",
    "Notifications",
    "Modules de formation",
    "Certification"
]
label_10 = f"{module_10}\n" + "\n".join(components_10)
dot.node(module_10, label=label_10, shape='box', style='filled', fillcolor='lightgreen')

# Ajouter les relations spécifiques pour le module 10 si nécessaire
# Exemple : dot.edge("API Gateway", module_10)

# Regénération du schéma complet avec le module 10 inclus
dot.render('architecture_modulaire_solia_complete', format='png', cleanup=False)
