

def format_savings_date(member_savings, member):
    balance = 0
    last_savings = member_savings.last()
    if last_savings:
        balance = last_savings.balance
    d = {
        "sl": member.serial_number,
        "member_id": member.id,
        "member_name": member.name,
        "guardian_name": member.guardian_name,
        "balance": balance,
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


def format_loan_data(loan, installments):
    member = loan.member
    d = {
        "sl": member.serial_number,
        "member_id": member.id,
        "member_name": member.name,
        "guardian_name": member.guardian_name,
        "loan_id": loan.id,
        "loan_amount": loan.amount,
        "loan_balance": loan.total_due,
        "week1": 0,
        "week2": 0,
        "week3": 0,
        "week4": 0,

    }
    for installment in installments:
        # Get saving posting date int.
        installment_date = installment.date.day
        if installment_date <= 7:
            d["week1"] = installment.amount
        elif installment_date > 7 and installment_date <= 14:
            d["week2"] = installment.amount
        elif installment_date > 14 and installment_date <= 21:
            d["week3"] = installment.amount
        elif installment_date > 21 and installment_date <= 31:
            d["week4"] = installment.amount
    return d