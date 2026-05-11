from django.db import models
#struktur database untuk API 

class PeriodeAkademik(models.Model):

    kode_periode = models.CharField(
        max_length=5
    )

    tahun_ajaran = models.CharField(
        max_length=20
    )

    semester = models.CharField(
        max_length=20
    )

    nama_periode = models.CharField(
        max_length=100
    )

    nama_singkat = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    tanggal_awal_kuliah = models.DateField()

    tanggal_akhir_kuliah = models.DateField()

    tanggal_awal_uts = models.DateField(
        blank=True,
        null=True
    )

    tanggal_akhir_uts = models.DateField(
        blank=True,
        null=True
    )

    tanggal_awal_uas = models.DateField(
        blank=True,
        null=True
    )

    tanggal_akhir_uas = models.DateField(
        blank=True,
        null=True
    )

    ketua_ujian = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    jumlah_pertemuan_kuliah = models.IntegerField(
        blank=True,
        null=True
    )

    minimal_presensi = models.IntegerField(
        blank=True,
        null=True
    )

    kuesioner_layanan = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    status = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.nama_periode