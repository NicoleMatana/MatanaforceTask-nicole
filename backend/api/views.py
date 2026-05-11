# logic untuk API Periode Akademik
from rest_framework import viewsets
from .models import PeriodeAkademik
from .serializers import PeriodeAkademikSerializer

class PeriodeAkademikViewSet(viewsets.ModelViewSet):
    queryset = PeriodeAkademik.objects.all()
    serializer_class = PeriodeAkademikSerializer