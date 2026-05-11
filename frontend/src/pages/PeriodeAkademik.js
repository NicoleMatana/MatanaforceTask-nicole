import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function PeriodeAkademik() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getData();
  }, []);

  // membuat fungsi untuk mengambil data dari API
  const getData = () => {
    setLoading(true);

    axios
      .get("http://127.0.0.1:8000/api/periode-akademik/")
      .then((response) => {
        setData(response.data);

        setLoading(false);
      });
  };

  const filteredData = data.filter((item) =>
    item.nama_periode.toLowerCase().includes(search.toLowerCase()),
  );

  // PAGINATION logic
  const indexOfLastRow = currentPage * rowsPerPage;

  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Mengambil data sesuai halaman.
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data?");

    if (!confirmDelete) return;

    try {
      for (let id of selectedIds) {
        await axios.delete(`http://127.0.0.1:8000/api/periode-akademik/${id}/`);
      }

      alert("Data berhasil dihapus");

      getData();

      setSelectedIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportExcel = () => {
    const exportData = filteredData.map((item) => ({
      Kode: item.kode_periode,

      "Nama Periode": item.nama_periode,

      "Tanggal Awal Kuliah": item.tanggal_awal_kuliah,

      "Tanggal Akhir Kuliah": item.tanggal_akhir_kuliah,

      "Tanggal Awal UTS": item.tanggal_awal_uts,

      "Tanggal Awal UAS": item.tanggal_awal_uas,

      Status: item.status ? "Aktif" : "Tidak Aktif",
    }));

    // menggunakan SheetJson untuk membuat file Excel dari data yang sudah diformat
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Periode Akademik");
    // generate file Excel dan trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // membuat Blob dari buffer Excel dan menggunakan file-saver untuk menyimpan file
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    // download file dengan nama "periode_akademik.xlsx"
    saveAs(fileData, "periode_akademik.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="top-title">
        <h2>Periode Akademik</h2>
        <span>Daftar Periode Akademik</span>
      </div>

      {/* ACTION BAR */}
      <div className="action-bar">
        <div className="left-action">
          <select className="filter-select">
            <option>-- Semua --</option>
          </select>

          <input
            type="text"
            placeholder="Cari Periode Akademik"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="search-btn">🔍︎</button>

          <button
            className="load-btn"
            onClick={() => {
              setSearch("");

              getData();
            }}
          >
            ⟳
          </button>
        </div>

        <div className="right-action">
          <Link to="/tambah-periode" className="btn-green">
            + Tambah
          </Link>

          <button className="btn-blue" onClick={handleExportExcel}>
            Export Excel
          </button>

          <button className="btn-blue" onClick={handlePrint}>
            Print
          </button>

          <button className="btn-red" onClick={handleDelete}>
            Hapus
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>

              <th>Kode</th>
              <th>Nama Periode</th>
              <th>Tgl. Awal Kuliah</th>
              <th>Tgl. Akhir Kuliah</th>
              <th>Tgl. Awal UTS</th>
              <th>Tgl. Awal UAS</th>
              <th>Aktif?</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>

                <td>{item.kode_periode}</td>

                <td>{item.nama_periode}</td>

                <td>{item.tanggal_awal_kuliah}</td>

                <td>{item.tanggal_akhir_kuliah}</td>

                <td>{item.tanggal_awal_uts}</td>

                <td>{item.tanggal_awal_uas}</td>

                <td>{item.status ? "Yes" : "No"}</td>

                <td>
                  <Link to={`/view-periode/${item.id}`} className="btn-blue">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination-wrapper">
          <div className="pagination-info">
            Hal {currentPage}/{totalPages}({filteredData.length} data)
          </div>

          <div>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));

                setCurrentPage(1);
              }}
              className="rows-select"
            >
              <option value={5}>5 baris</option>
              <option value={10}>10 baris</option>
              <option value={25}>25 baris</option>
              <option value={50}>50 baris</option>
            </select>
          </div>

          <div className="pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {"<"}
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeriodeAkademik;
