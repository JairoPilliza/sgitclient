namespace deceserver.Models.Sociodemografico
{
    public class DeceSDDatoNinioRecienNacido
    {
        public int idDeceSDDatoNinioRecienNacido { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDDatoNinioRecienNacidoOpcion { get; set; }
        public string? descripcion { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
