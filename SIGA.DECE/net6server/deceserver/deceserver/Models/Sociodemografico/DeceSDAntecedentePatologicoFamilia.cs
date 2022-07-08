namespace deceserver.Models.Sociodemografico
{
    public class DeceSDAntecedentePatologicoFamilia
    {
        public int idDeceSDAntecedentePatologicoFamilia { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDAntecedentePatologicoFamiliaOpcion { get; set; }
       
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
