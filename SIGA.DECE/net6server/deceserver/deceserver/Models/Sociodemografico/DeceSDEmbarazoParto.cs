namespace deceserver.Models.Sociodemografico
{
    public class DeceSDEmbarazoParto
    {
        public int idDeceSDEmbarazoParto { get; set; }
        public int idDeceSociodemografico { get; set; }
        public int idDeceSDEmbarazoPartoOpcion { get; set; }
        public int idDeceSDDatoNinioRecienNacido { get; set; }
        public List<DeceSDAntecedentePatologicoFamiliaOpcion>? antep { get; set; }
        public List<DeceSDAntecedenteDificultadEscolarOpcion>? antecedenteEducacional { get; set; }
        public string? descripcion { get; set; }
        public string? pesoNacer { get; set; }
        public string? tallaNacer { get; set; }
        public string? edadCaminar { get; set; }
        public string? edadHablar { get; set; }
        public string? periodoLactancia { get; set; }
        public string? edadUsoBiberon { get; set; }
        public string? edadControlEsfinter { get; set; }
        public string? sufrioEnuresis { get; set; }
        public DateTime fechaRegistro { get; set; }
    }
}
