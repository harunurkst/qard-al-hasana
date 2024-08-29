from .models import Savings, Installment
from journal.models import GeneralJournal


def format_savings_date(member, month):
    balance = 0
    member_savings = GeneralJournal.objects.filter(member=member, accounts__code='DE')
    current_month_savings = member_savings.filter(date__month=month)
    balance = GeneralJournal.objects.get_member_balance(member)

    # If no current month savings data, get last savings balance
    # if not current_month_savings:
    #     last_savings = member_savings.last()
    #     if last_savings:
    #         balance = last_savings.balance
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

    # Format current month savings data as week1, week2, week3, week4
    for savings in current_month_savings:
        # Get saving posting date int.
        savings_date = savings.date.day
        if savings_date <= 7:
            d["week1"] = savings.credit
        elif 7 < savings_date <= 14:
            d["week2"] = savings.credit
        elif 14 < savings_date <= 21:
            d["week3"] = savings.credit
        elif 21 < savings_date <= 31:
            d["week4"] = savings.credit
    return d


def format_loan_data(loan, month):
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

    # Format current month installment
    installments = Installment.objects.filter(loan=loan, date__month=month)
    for installment in installments:
        # Get saving posting date int.
        installment_date = installment.date.day
        if installment_date <= 7:
            d["week1"] = installment.amount
        elif 7 < installment_date <= 14:
            d["week2"] = installment.amount
        elif 14 < installment_date <= 21:
            d["week3"] = installment.amount
        elif 21 < installment_date <= 31:
            d["week4"] = installment.amount
    return d
