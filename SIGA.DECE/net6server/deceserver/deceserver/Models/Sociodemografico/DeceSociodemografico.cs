namespace deceserver.Models.Sociodemografico
{
    public class DeceSociodemografico
    {
        public int idDeceSociodemografico { get; set; }
        public string? codigo { get; set; }
        public int codAlumno { get; set; }
        public string? nombreAlumno { get; set; }
        public string? curso { get; set; }
        public DateTime fechaEntrevista { get; set; }
        public string? lugarNacimiento { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string? domicilio { get; set; }
        public string? sector { get; set; }
        public string? cambioDomicilio { get; set; }
        //public string? contacto { get; set; }/*telefono*/
        public List<string>? telefono { get; set; }/*telefono campo adicional*/
        //public string? celular { get; set; }
        public List<string>? celular { get; set; }/*telefono campo adicional*/
        public DateTime fechaRegistro { get; set; }
        
        public int? gestion { get; set; }
      
        public int? idModalidad { get; set; }
        public string? modalidad { get; set; }
        public int? idGrado { get; set; }
        public string? codigoGrado { get; set; }
        public string? descripcionGrado { get; set; }
        public int? idParalelo { get; set; }
        public string? paralelo { get; set; }
        public int? idTurno { get; set; }
        public string? turno { get; set; }
    }
}
