namespace deceserver.Models.Sociodemografico
{
    public class DeceSDIngresoEgresoFamilia
    {
        public int idDeceSDIngresoEgresoFamilia { get; set; }
        public int idDeceSociodemografico { get; set; }
        //public int idDeceSDIngresoEgresoFamiliaOpcion { get; set; }
        public int idDeceSDViviendaCondicionOpcion { get; set; }
        public List<DeceSDViviendaServicioOpcion> servicio { get; set; }
        public decimal valorPadre { get; set; }
        public decimal valorMadre { get; set; }
        public decimal valorOtros { get; set; }
        public decimal valorIngresos { get; set; }
        public decimal valorEgresos { get; set; }
        public DateTime fechaRegistro { get; set; }


    }
}
