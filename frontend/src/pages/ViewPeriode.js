import { useEffect, useState } from "react";
import axios from "axios";
import {
  useNavigate, //buat pindah halamann
  useParams, // buat ambil parameter dari URL
} from "react-router-dom";

import "../style.css";

function ViewPeriode() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {

    axios
      .get(
        `http://127.0.0.1:8000/api/periode-akademik/${id}/`
      )
      .then((response) => {
        setData(response.data);
      });

  }, [id]);

  const handleDelete = async () => {

    const confirmDelete =
      window.confirm(
        "Yakin ingin menghapus data?"
      );

    if (!confirmDelete) return;

    await axios.delete(
      `http://127.0.0.1:8000/api/periode-akademik/${id}/`
    );

    alert("Data berhasil dihapus");

    navigate("/");
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

      {/* ACTION BUTTON */}
      <div className="detail-action">

        <button
          className="btn-blue"
          onClick={() => navigate("/")}
        >
         ⮜ Kembali ke Daftar
        </button>

        <button
          className="btn-green"
          onClick={() =>
            navigate("/tambah-periode")
          }
        >
          + Tambah Baru
        </button>

        <button
          className="btn-warning"
          onClick={() =>
            navigate(`/edit-periode/${id}`)
          }
        >
          Edit
        </button>

        <button
          className="btn-red"
          onClick={handleDelete}
        >
          Hapus
        </button>

      </div>

      {/* DETAIL */}
      <div className="detail-card">

        {/* LEFT */}
        <div className="detail-column">

          <div className="detail-group">
            <label>Kode Periode</label>
            <span>{data.kode_periode}</span>
          </div>

          <div className="detail-group">
            <label>Tahun Ajaran</label>
            <span>{data.tahun_ajaran}</span>
          </div>

          <div className="detail-group">
            <label>Semester</label>
            <span>{data.semester}</span>
          </div>

          <div className="detail-group">
            <label>Nama Periode</label>
            <span>{data.nama_periode}</span>
          </div>

          <div className="detail-group">
            <label>Nama Singkat</label>
            <span>{data.nama_singkat}</span>
          </div>

          <div className="detail-group">
            <label>Tanggal Awal Kuliah</label>
            <span>{data.tanggal_awal_kuliah}</span>
          </div>

          <div className="detail-group">
            <label>Tanggal Akhir Kuliah</label>
            <span>{data.tanggal_akhir_kuliah}</span>
          </div>

          <div className="detail-group">
            <label>Tanggal Awal UTS</label>
            <span>{data.tanggal_awal_uts}</span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="detail-column">

          <div className="detail-group">
            <label>Tanggal Akhir UTS</label>
            <span>{data.tanggal_akhir_uts}</span>
          </div>

          <div className="detail-group">
            <label>Tanggal Awal UAS</label>
            <span>{data.tanggal_awal_uas}</span>
          </div>

          <div className="detail-group">
            <label>Tanggal Akhir UAS</label>
            <span>{data.tanggal_akhir_uas}</span>
          </div>

          <div className="detail-group">
            <label>Ketua Ujian</label>
            <span>{data.ketua_ujian}</span>
          </div>

          <div className="detail-group">
            <label>Jumlah Pertemuan Kuliah</label>
            <span>
              {data.jumlah_pertemuan_kuliah}
            </span>
          </div>

          <div className="detail-group">
            <label>
              Minimal Presensi
            </label>

            <span>
              {data.minimal_presensi}
            </span>
          </div>

          <div className="detail-group">
            <label>Kuesioner Layanan</label>
            <span>
              {data.kuesioner_layanan}
            </span>
          </div>

          <div className="detail-group">
            <label>Aktif?</label>

            <span>
              {data.status ? "✔" : "✖"}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewPeriode;