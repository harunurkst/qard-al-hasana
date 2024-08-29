from django import forms
from organization.models import Team
from peoples.models import Member
from .models import Loan


class MemberChoiceForm(forms.Form):
    team = forms.ModelChoiceField(queryset=Team.objects.all())
    serial_number = forms.IntegerField()

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')  # Extract the user from the kwargs
        super(MemberChoiceForm, self).__init__(*args, **kwargs)

        # Filter the queryset of the project field based on the user
        self.fields['team'].queryset = Team.objects.filter(owner=user)


class DepositForm(forms.Form):
    date = forms.DateField(widget=forms.DateInput(attrs={'class': 'form-control'}))
    amount = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}))


class InstallmentForm(forms.Form):
    date = forms.DateField(widget=forms.DateInput(attrs={'class': 'form-control'}))
    amount = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}))


class LoanDisbursementForm(forms.ModelForm):
    class Meta:
        model = Loan
        fields = ['date', 'amount', 'total_installment']

    def clean(self):
        cleaned_data = super().clean()
        amount = cleaned_data.get('amount')
        total_installment = cleaned_data.get('total_installment')
        total_installment = cleaned_data.get('total_installment')

        if amount <= 0:
            self.add_error('amount', "Loan amount must be positive.")

        if total_installment <= 0:
            self.add_error('total_installment', "Total installments must be a positive number.")

        return cleaned_data
