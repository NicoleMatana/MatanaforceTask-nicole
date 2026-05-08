import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../style.css";

function TambahPeriode() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    kode_periode: "",

    tahun_ajaran: "",

    semester: "",

    nama_periode: "",

    nama_singkat: "",

    tanggal_awal_kuliah: "",

    tanggal_akhir_kuliah: "",

    tanggal_awal_uts: "",

    tanggal_akhir_uts: "",

    tanggal_awal_uas: "",

    tanggal_akhir_uas: "",

    ketua_ujian: "",

    jumlah_pertemuan_kuliah: "",

    minimal_presensi: "",

    kuesioner_layanan: "",

    status: true,
  });

  const handleChange = (e) => {

  const { name, value } = e.target;

  const updatedData = {
    ...formData,

    [name]:
      name === "status"
        ? value === "true"
        : value,
  };

  // AUTO GENERATE NAMA PERIODE
  updatedData.nama_periode =
    updatedData.tahun_ajaran &&
    updatedData.semester
      ? `Periode ${updatedData.tahun_ajaran} ${updatedData.semester}`
      : "";

  setFormData(updatedData);
};

  const handleSubmit = () => {

  const cleanedData = {

    ...formData,

    kode_periode: 
     formData.kode_periode || null,

    tanggal_awal_uts:
      formData.tanggal_awal_uts || null,

    tanggal_akhir_uts:
      formData.tanggal_akhir_uts || null,

    tanggal_awal_uas:
      formData.tanggal_awal_uas || null,

    tanggal_akhir_uas:
      formData.tanggal_akhir_uas || null,

    ketua_ujian:
      formData.ketua_ujian || null,

    jumlah_pertemuan_kuliah:
      formData.jumlah_pertemuan_kuliah || null,

    minimal_presensi:
      formData.minimal_presensi || null,

    kuesioner_layanan:
      formData.kuesioner_layanan || null,
  };

  axios
    .post(
      "http://127.0.0.1:8000/api/periode-akademik/",
      cleanedData
    )
    .then(() => {

      alert("Data berhasil disimpan");

      navigate("/");
    })
    .catch((error) => {

      console.log(error.response.data);

      alert(
        "Gagal menyimpan data, pastikan semua kolom yang wajib diisi sudah terisi dengan benar."
      );
    });
};

  return (

    <div className="page-container">

      {/* HEADER */}
      <div className="top-title">

        <h2>Data Periode Akademik</h2>

        <span>
          Detail Periode Akademik
        </span>

      </div>

      {/* BUTTON */}
      <div className="detail-action">

        <button
          className="btn-blue"
          onClick={() => navigate("/")}
        >
          ⮜ Kembali ke Daftar
        </button>

        <button
          className="btn-green"
          onClick={handleSubmit}
        >
          Simpan
        </button>

      </div>

      {/* FORM */}
      <div className="form-card">

        {/* LEFT */}
        <div className="form-column">

          <div className="form-group">
            <label>Kode Periode *</label>

            <input
              type="text"
              name="kode_periode"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">

  <label>Tahun Ajaran *</label>

  <select
    name="tahun_ajaran"
    value={formData.tahun_ajaran}
    onChange={handleChange}
    required
  >

    <option value="">
      Pilih Tahun Ajaran
    </option>

    {[...Array(14)].map((_, index) => {

      const startYear = 2015 + index;

      const endYear = startYear + 1;

      const value =
        `${startYear}/${endYear}`;

      return (

        <option
          key={value}
          value={value}
        >
          {value}
        </option>

      );
            })}

          </select>

        </div>

          <div className="form-group">
            <label>
              Semester *
            </label>

            <select
              name="semester"
              onChange={handleChange}
              required
            >

              <option value="">
                Pilih Semester
              </option>

              <option value="Ganjil">
                Ganjil
              </option>

              <option value="Genap">
                Genap
              </option>

            </select>
          </div>

          <div className="form-group">

            <label>Nama Periode </label>

            <input
              type="text"
              name="nama_periode"
              value={
                formData.tahun_ajaran &&
                formData.semester
                  ? `Periode ${formData.tahun_ajaran} ${formData.semester}`
                  : ""
              }
              readOnly
            />

          </div>

          <div className="form-group">
            <label>
              Nama Singkat *
            </label>

            <input
              type="text"
              name="nama_singkat"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Tanggal Awal Kuliah *
            </label>

            <input
              type="date"
              name="tanggal_awal_kuliah"
              value={formData.tanggal_awal_kuliah}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Tanggal Akhir Kuliah *
            </label>

            <input
              type="date"
              name="tanggal_akhir_kuliah"
              value={formData.tanggal_akhir_kuliah}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Tanggal Awal UTS
            </label>

            <input
              type="date"
              name="tanggal_awal_uts"
              value={formData.tanggal_awal_uts} 
              onChange={handleChange}
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="form-column">

          <div className="form-group">
            <label>
              Tanggal Akhir UTS
            </label>

            <input
              type="date"
              name="tanggal_akhir_uts"
              value={formData.tanggal_akhir_uts}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Tanggal Awal UAS
            </label>

            <input
              type="date"
              name="tanggal_awal_uas"
              value={formData.tanggal_awal_uas} 
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Tanggal Akhir UAS
            </label>

            <input
              type="date"
              name="tanggal_akhir_uas"
              value={formData.tanggal_akhir_uas}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Ketua Ujian
            </label>

            <input
              type="text"
              name="ketua_ujian"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Jumlah Pertemuan Kuliah
            </label>

            <input
              type="number"
              name="jumlah_pertemuan_kuliah"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Minimal Presensi
            </label>

            <input
              type="number"
              name="minimal_presensi"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Kuesioner Layanan
            </label>

            <input
              type="text"
              name="kuesioner_layanan"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">

            <label>Aktif? *</label>

            <select
              name="status"
              value={String(formData.status)}
              onChange={handleChange}
              required
            >

              <option value={true}>
                Aktif
              </option>

              <option value={false}>
                Tidak Aktif
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TambahPeriode;