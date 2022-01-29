AOS.init();

$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  $("#navbarNavDropdown").removeClass("show");
});

$(".kirim").on("click", (e) => {
  e.preventDefault();
  const name = $("#name");
  const email = $("#email");
  const pesan = $("#pesan");
  const validation_name = $("#validation-name");
  const validation_email = $("#validation-email");
  const validation_pesan = $("#validation-pesan");

  if (name.val() === "") {
    name.addClass("is-invalid");
    validation_name.addClass("invalid-feedback");
    validation_name.text("Harap Isi Nama Anda");
  }
  if (email.val() === "") {
    email.addClass("is-invalid");
    validation_email.addClass("invalid-feedback");
    validation_email.text("Harap Isi Email Anda");
  }
  if (pesan.val() === "") {
    pesan.addClass("is-invalid");
    validation_pesan.addClass("invalid-feedback");
    validation_pesan.text("Harap Isi Field Pesan");
  }
  if (name.val() !== "" && email.val() !== "" && pesan.val() !== "") {
    $(".kirim").text("");
    $(".kirim").prop("disabled", true);
    $(".kirim").append(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinner"></span> Loading...`);
    $.ajax({
      type: "POST",
      url: "https://api.apispreadsheets.com/data/20684/",
      data: {
        name: name.val(),
        email: email.val(),
        message: pesan.val(),
      },
      success: function () {
        $(".kirim").empty();
        $(".kirim").prop("disabled", false);
        $(".kirim").text("Submit");
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Data berhasil terkirim!",
          confirmButtonColor: "#3085d6",
        });
        name.val("");
        email.val("");
        pesan.val("");
        if (name.hasClass("is-invalid")) {
          name.removeClass("is-invalid");
          validation_name.removeClass("invalid-feedback");
          validation_name.text("");
        }
        if (email.hasClass("is-invalid")) {
          email.removeClass("is-invalid");
          validation_email.removeClass("invalid-feedback");
          validation_email.text("");
        } else if (email.hasClass("is-valid")) {
          email.removeClass("is-valid");
          validation_email.removeClass("valid-feedback");
          validation_email.text("");
        }
        if (pesan.hasClass("is-invalid")) {
          pesan.removeClass("is-invalid");
          validation_pesan.removeClass("invalid-feedback");
          validation_pesan.text("");
        }
      },
      error: function () {
        $(".kirim").empty();
        $(".kirim").prop("disabled", false);
        $(".kirim").text("Submit");
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Data gagal terkirim!",
          confirmButtonColor: "#3085d6",
        });
        name.val("");
        email.val("");
        pesan.val("");
      },
    });
  }
});

$("#name").on("keypress", function () {
  if ($("#name").hasClass("is-invalid") && $("#validation-name").hasClass("invalid-feedback")) {
    $("#name").removeClass("is-invalid");
    $("#validation-name").removeClass("invalid-feedback");
    $("#validation-name").text("");
  }
});

$("#email").on("keypress", function () {
  const regexEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if ($("#email").hasClass("is-invalid") && $("#validation-email").hasClass("invalid-feedback")) {
    $("#email").removeClass("is-invalid");
    $("#validation-email").removeClass("invalid-feedback");
    $("#validation-email").text("");
  }
  if (regexEmail.test($("#email").val())) {
    $("#email").addClass("is-valid");
    $("#validation-email").addClass("valid-feedback");
    $("#validation-email").text("OK, Formatnya Sesuai!");
    $(".kirim").prop("disabled", false);
  } else {
    $("#email").addClass("is-invalid");
    $("#validation-email").addClass("invalid-feedback");
    $("#validation-email").text("Format Email Tidak Sesuai!");
    $(".kirim").prop("disabled", true);
  }
});

$("#pesan").on("keypress", function () {
  if ($("#pesan").hasClass("is-invalid") && $("#validation-pesan").hasClass("invalid-feedback")) {
    $("#pesan").removeClass("is-invalid");
    $("#validation-pesan").removeClass("invalid-feedback");
    $("#validation-pesan").text("");
  }
});

$(window).on("scroll", function () {
  scrollBackToTop();
});

function scrollBackToTop() {
  if ($(document).scrollTop() > 100) {
    $("#btn-back-to-top").removeClass("animate__rotateOut");
    $("#btn-back-to-top").addClass("animate__rotateIn");
    $("#btn-back-to-top").removeClass("d-none");
  } else if ($(document).scrollTop() < 100) {
    $("#btn-back-to-top").removeClass("animate__heartBeat");
    $("#btn-back-to-top").addClass("animate__rotateOut");
    $("#btn-back-to-top").removeClass("animate__rotateIn");
  }
}

$("#btn-back-to-top").on("click", function () {
  $(document).scrollTop(0);
});
