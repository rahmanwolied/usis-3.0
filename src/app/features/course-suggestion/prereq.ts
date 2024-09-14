export const prereq = {
    "courses": [
        {
            "course": "CSE111",
            "hard_pre_requisite": ["CSE110"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE110"]
        },
        {
            "course": "CSE220",
            "hard_pre_requisite": ["CSE111", "CSE230"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE230", "CSE111", "CSE110"]
        },
        {
            "course": "CSE221",
            "hard_pre_requisite": ["CSE220"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE250",
            "hard_pre_requisite": [],
            "soft_pre_requisite": ["PHY112"],
            "full_chain_pre_requisite": ["PHY112"]
        },
        {
            "course": "CSE251",
            "hard_pre_requisite": ["CSE250"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE250"]
        },
        {
            "course": "CSE260",
            "hard_pre_requisite": ["CSE251"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE251", "CSE250"]
        },
        {
            "course": "CSE310",
            "hard_pre_requisite": ["CSE370"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE370", "CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE321",
            "hard_pre_requisite": ["CSE221"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE330",
            "hard_pre_requisite": ["MAT216"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT120", "MAT110"]
        },
        {
            "course": "CSE331",
            "hard_pre_requisite": ["CSE221"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE340",
            "hard_pre_requisite": [],
            "soft_pre_requisite": ["CSE260"],
            "full_chain_pre_requisite": ["CSE260", "CSE251", "CSE250"]
        },
        {
            "course": "CSE341",
            "hard_pre_requisite": [],
            "soft_pre_requisite": ["CSE340", "CSE321"],
            "full_chain_pre_requisite": []
        },
        {
            "course": "CSE350",
            "hard_pre_requisite": ["CSE251"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE251", "CSE250"]
        },
        {
            "course": "CSE360",
            "hard_pre_requisite": ["CSE341"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE341"]
        },
        {
            "course": "CSE370",
            "hard_pre_requisite": ["CSE221"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE410",
            "hard_pre_requisite": ["CSE321"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE321", "CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE420",
            "hard_pre_requisite": ["CSE321", "CSE331", "CSE340"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE321", "CSE331", "CSE340", "CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE421",
            "hard_pre_requisite": [],
            "soft_pre_requisite": ["CSE320"],
            "full_chain_pre_requisite": []
        },
        {
            "course": "CSE422",
            "hard_pre_requisite": ["CSE221"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE423",
            "hard_pre_requisite": ["MAT216"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT216", "MAT120", "MAT110"]
        },
        {
            "course": "CSE430",
            "hard_pre_requisite": ["MAT120"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT120", "MAT110"]
        },
        {
            "course": "CSE460",
            "hard_pre_requisite": ["CSE260"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE260", "CSE251", "CSE250"]
        },
        {
            "course": "CSE461",
            "hard_pre_requisite": ["CSE260"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE260", "CSE251", "CSE250"]
        },
        {
            "course": "CSE470",
            "hard_pre_requisite": ["CSE370"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE370", "CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "CSE471",
            "hard_pre_requisite": ["CSE370"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["CSE370", "CSE221", "CSE220", "CSE111", "CSE110"]
        },
        {
            "course": "ENG102",
            "hard_pre_requisite": ["ENG101"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["ENG101"]
        },
        {
            "course": "ENG103",
            "hard_pre_requisite": ["ENG102"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["ENG102"]
        },
        {
            "course": "MAT120",
            "hard_pre_requisite": ["MAT110"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT110"]
        },
        {
            "course": "MAT215",
            "hard_pre_requisite": ["MAT216"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT216", "MAT120", "MAT110"]
        },
        {
            "course": "MAT216",
            "hard_pre_requisite": ["MAT120"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["MAT120", "MAT110"]
        },
        {
            "course": "PHY112",
            "hard_pre_requisite": ["PHY111"],
            "soft_pre_requisite": [],
            "full_chain_pre_requisite": ["PHY111"]
        }
    ]
}
