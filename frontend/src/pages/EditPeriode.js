// analogi strukturnya
// user isi form edit -> data masuk ke state -> submit -> kirim data ke backend -> backend simpan di database
import { useEffect, useState } from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "../style.css";

function EditPeriode() {

  const navigate = useNavigate();

  const { id } = useParams();

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

  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/api/periode-akademik/${id}/`
      )
      .then((response) => {

        setFormData(response.data);
      });

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {

    axios
      .put(
        `http://127.0.0.1:8000/api/periode-akademik/${id}/`,
        formData
      )
      .then(() => {

        alert("Data berhasil diupdate");

        navigate("/");
      })
      .catch((error) => {

        console.log(error);

        alert("Gagal update data, Silahkan mengisi kolom yang wajib diisi");
      });
  };

  return (

    <div className="page-container">

      {/* HEADER */}
      <div className="top-title">

        <h2>Edit Periode Akademik</h2>

        <span>
          Update Data Periode Akademik
        </span>

      </div>

      {/* BUTTON */}
      <div className="detail-action">

        <button
          className="btn-blue"
          onClick={() => navigate("/")}
        >
          ⮜ Kembali
        </button>

        <button
          className="btn-green"
          onClick={handleSubmit}
        >
          Update
        </button>

      </div>

      {/* FORM */}
      <div className="form-card">

        {/* LEFT */}
        <div className="form-column">

          <div className="form-group">
            <label>Kode Periode</label>

            <input
              type="text"
              name="kode_periode"
              value={formData.kode_periode}
              onChange={handleChange}
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
            <label>Semester * </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >

              <option value="Ganjil">
                Ganjil
              </option>

              <option value="Genap">
                Genap
              </option>

            </select>
          </div>

          <div className="form-group">

            <label>Nama Periode *</label>

            <input
              required
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
            <label>Nama Singkat *</label>

            <input
              type="text"
              name="nama_singkat"
              value={formData.nama_singkat}
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
              required
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
              required
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
            <label>Ketua Ujian</label>

            <input
              type="text"
              name="ketua_ujian"
              value={formData.ketua_ujian}
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
              value={formData.jumlah_pertemuan_kuliah}
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
              value={formData.minimal_presensi}
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
              value={formData.kuesioner_layanan}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">

            <label>Aktif? *</label>

            <select
              name="status"
              value={formData.status}
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

export default EditPeriode;