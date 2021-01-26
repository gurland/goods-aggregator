from .store import Store
from .retail_chain import RetailChain

NOVUS_STORES = [
    Store(
        "48201030",
        "kiev",
        "50.4526, 30.5944",
        {
            "uk": {
                "city": "Київ",
                "street": "Броварський пр-т",
                "building": "17"
            },
            "ru": {
                "city": "Киев",
                "street": "Броварской пр-т",
                "building": "17"
            },
            "en": {
                "city": "Kyiv",
                "street": "Brovarskiy Blv",
                "building": "17"
            }
        },
    ),
    Store(
        "482010105",
        "kiev",
        "50.4931815, 30.5581461",
        {
            "uk": {
                "city": "Київ",
                "street": "просп. Ватутіна",
                "building": "2т"
            },
            "ru": {
                "city": "Киев",
                "street": "просп. Ватутина",
                "building": "2т"
            },
            "en": {
                "city": "Kyiv",
                "street": "Vatutina Avenue",
                "building": "2t"
            }
        },
    ),
    Store(
        "48206110",
        "mykolaiv",
        "46.9659448, 32.0773213",
        {
            "uk": {
                "city": "Миколаїв",
                "street": "Космонавтів",
                "building": "83А"
            },
            "ru": {
                "city": "Николаев",
                "street": "Космонавтов",
                "building": "83А"
            },
            "en": {
                "city": "Mykolaiv",
                "street": "Kosmonavtiv",
                "building": "83A"
            }
        },
    )
]
METRO_STORES = [
    Store(
        "48215610",
        "kiev",
        "50.39051, 30.64142",
        {
            "uk": {
                "city": "Київ",
                "street": "Григоренко",
                "building": "43"
            },
            "ru": {
                "city": "Киев",
                "street": "Григоренко",
                "building": "43"
            },
            "en": {
                "city": "Kiev",
                "street": "Grigorenko",
                "building": "43"
            }
        },
    ),
    Store(
        "48215612",
        "odesa",
        "46.448391, 30.661012",
        {
            "uk": {
                "city": "Одеса",
                "street": "Аеропортівська",
                "building": "29"
            },
            "ru": {
                "city": "Одесса",
                "street": "Аэропортовская",
                "building": "29"
            },
            "en": {
                "city": "Odesa",
                "street": "Aeroportіvska",
                "building": "29"
            }
        },
    ),
    Store(
        "48215637",
        "lviv",
        "49.8137516, 24.0731128",
        {
            "uk": {
                "city": "Львів",
                "street": "Дж Вашингтона",
                "building": "8"
            },
            "ru": {
                "city": "Львов",
                "street": "Дж Вашингтона",
                "building": "8"
            },
            "en": {
                "city": "Lviv",
                "street": "G Washington",
                "building": "8"
            }
        },
    )
]
AUCHAN_STORES = [
    Store(
        "48246401",
        "kiev",
        "50.491319, 30.489957",
        {
            "uk": {
                "city": "Київ",
                "street": "Степана Бандери",
                "building": "15А"
            },
            "ru": {
                "city": "Киев",
                "street": "Степана Бандеры",
                "building": "15А"
            },
            "en": {
                "city": "Kyiv",
                "street": "S.Bandera Avenue",
                "building": "15A"
            }
        },
    ),
    Store(
        "48246409",
        "lviv",
        "49.773581, 24.010427",
        {
            "uk": {
                "city": "Львів",
                "street": "Стрийська",
                "building": "30"
            },
            "ru": {
                "city": "Львов",
                "street": "Стрийская",
                "building": "30"
            },
            "en": {
                "city": "Lviv",
                "street": "Stryiska",
                "building": "30"
            }
        },
    ),
    Store(
        "48246411",
        "auchan",
        "47.8181543, 35.1568487",
        {
            "uk": {
                "city": "Запоріжжя",
                "street": "Запорізька",
                "building": "1Б"
            },
            "ru": {
                "city": "Запорожье",
                "street": "Запорожская",
                "building": "1Б"
            },
            "en": {
                "city": "Zaporizhzhia",
                "street": "Zaporizska",
                "building": "1B"
            }
        },
    )
]

RETAIL_CHAINS = [
    RetailChain("novus", "buckwheat", NOVUS_STORES),
    RetailChain("metro", "buckwheat-metro", METRO_STORES),
    RetailChain("auchan", "buckwheat-auchan", AUCHAN_STORES),
]

__all__ = ['RETAIL_CHAINS']
