namespace deceserver.Models.Sociodemografico
{
    public class DeceSDDatoFamiliar
    {
        public int idDeceSDDatoFamiliar { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int numeroItem { get; set; }
        public int idTipoRelacion { get; set; }
        public string? primerApellido { get; set; }
        public string? segundoApellido { get; set; }
        public string? primerNombre { get; set; }
        public string? segundoNombre { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public int idEstadoCivil { get; set; }
        public int idDeceSDInstruccionOpcion { get; set; }
        public string? profesionOcupacion { get; set; }
        public string? lugarTrabajoEmpresa { get; set; }
        public decimal? ingreso { get; set; }
        public int idReligion { get; set; }
        public List<string>? telefono { get; set; }/*telefono campo adicional*/
        //public string? celular { get; set; }
        public List<string>? celular { get; set; }/*telefono campo adicional*/
    }
}
