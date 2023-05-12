

def format_savings_date(member_savings, member):
    d = {
        "sl": member.serial_number,
        "member_id": member.id,
        "member_name": member.name,
        "guardian_name": member.guardian_name,
        "balance": member_savings.last().balance,
        "week1": 0,
        "week2": 0,
        "week3": 0,
        "week4": 0,
    }

    for savings in member_savings:
        # Get saving posting date int.
        savings_date = savings.date.day
        if savings_date <= 7:
            d["week1"] = savings.amount
        elif savings_date > 7 and savings_date <= 14:
            d["week2"] = savings.amount
        elif savings_date > 14 and savings_date <= 21:
            d["week3"] = savings.amount
        elif savings_date > 21 and savings_date <= 31:
            d["week4"] = savings.amount
    return d