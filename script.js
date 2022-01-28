AOS.init();

$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
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
    $("#validation-email").addClass("invalid-feedback");
    $("#validation-email").text("Harap Isi Email Anda");
  }
  if (pesan.val() === "") {
    pesan.addClass("is-invalid");
    $("#validation-pesan").addClass("invalid-feedback");
    $("#validation-pesan").text("Harap Isi Field Pesan");
  }
  if (name.val() !== "" && email.val() !== "" && pesan.val() !== "") {
    // console.log($("#contact-form").serialize());
    $.ajax({
      type: "POST",
      url: "https://api.apispreadsheets.com/data/20684/",
      data: {
        name: name.val(),
        email: email.val(),
        message: pesan.val(),
      },
      success: function () {
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
        }
        if (pesan.hasClass("is-invalid")) {
          pesan.removeClass("is-invalid");
          validation_pesan.removeClass("invalid-feedback");
          validation_pesan.text("");
        }
      },
      error: function () {
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
    // $("#btn-back-to-top").hide();
  }
}

$("#btn-back-to-top").on("click", function () {
  $(document).scrollTop(0);
});
