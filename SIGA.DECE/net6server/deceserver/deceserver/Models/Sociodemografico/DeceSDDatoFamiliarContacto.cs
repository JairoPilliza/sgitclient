namespace deceserver.Models.Sociodemografico
{
    public class DeceSDDatoFamiliarContacto
    {
        public int idDeceSDDatoFamiliarContacto { get; set; }
        public int idDeceSDDatoFamiliar { get; set; }
        public int idDeceSDContactoOpcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
