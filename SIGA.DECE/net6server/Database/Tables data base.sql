-- CREATE DATABASE SIGA_DECE
-- USE SIGA_DECE
-- USE master
--SELECT * FROM TipoRelacion where IdTipoRelacion IN (13)
--SELECT * FROM dbo.Parentesco WHERE idparentesco IN (6612,6613)
--SELECT * FROM TipoRelacion where IdTipoRelacion IN (14)

/*
codPersona  => idTipoRelacion
idPersonaParentesco => idTipoRelacionSalida

ejemplo:

codPersona: 1 (Jefferson Mena) => idTipoRelacion: 2 (Hijo)
idPersonaParentesco: 2 (Gladis Camacho) => idTipoRelacionSalida: 5 (Madre)

*/

/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 1 Formulario SOCIODEMOGRAFICO
	=============== *************************************************************************************************************************************
	===============
*/



--DROP TABLE dbo.DeceSociodemografico
--DROP TABLE dbo.DeceInstruccionTipo
--DROP TABLE dbo.DeceSDDatoFamiliar
--DROP TABLE dbo.DeceContactoTipo
--DROP TABLE dbo.DeceSDDatoFamiliarContacto
--DROP TABLE dbo.DeceIngresoEgresoTipo
--DROP TABLE dbo.DeceSDIngresoEgresoFamilia
--DROP TABLE dbo.DeceSDViviendaCondicionTipo
--DROP TABLE dbo.DeceSDViviendaCondicion
--DROP TABLE dbo.DeceSDViviendaServicioTipo
--DROP TABLE dbo.DeceSDViviendaServicio

--DROP TABLE dbo.DeceSDEmbarazoPartoOpcion
--DROP TABLE dbo.DeceSDEmbarazoParto
--DROP TABLE dbo.DeceSDDatoNinioRecienNacidoOpcion
--DROP TABLE dbo.DeceSDDatoNinioRecienNacido
--DROP TABLE dbo.DeceSDAntecedentePatologicoFamiliaOpcion
--DROP TABLE dbo.DeceSDAntecedentePatologicoFamilia
--DROP TABLE dbo.DeceSDAntecedenteDificultadEscolarOpcion
--DROP TABLE dbo.DeceSDAntecedenteDificultadEscolar
--DROP TABLE dbo.DeceSDDatoSaludOpcion
--DROP TABLE dbo.DeceSDDatoSalud
--DROP TABLE dbo.DeceSDHistoriaEducacionalOpcion
--DROP TABLE dbo.DeceSDHistoriaEducacional


--DROP TABLE dbo.DeceDerivacionOpcion
--DROP TABLE dbo.DeceDerivacion
--DROP TABLE dbo.DeceDerivacionInstitucionExternaOpcion
--DROP TABLE dbo.DeceDerivacionInstitucionExterna
--DROP TABLE dbo.DeceDerivacionDatoPersonalDerivado
--DROP TABLE dbo.DeceDerivacionValoracionCaso


--DROP TABLE dbo.DeceIntervencionSesionSeguimientoOpcion
--DROP TABLE dbo.DeceIntervencion
--DROP TABLE dbo.DeceIntervencionDestinatario
--DROP TABLE dbo.DeceIntervencionRiesgoIdentificado
--DROP TABLE dbo.DeceIntervencionAreaOpcion
--DROP TABLE dbo.DeceIntervencionArea
--DROP TABLE dbo.DeceIntervencionObjetivoGeneral
--DROP TABLE dbo.DeceIntervencionObjetivoEspecifico
--DROP TABLE dbo.DeceIntervencionAccionEstrategia
--DROP TABLE dbo.DeceIntervencionResultadoObtenido
--DROP TABLE dbo.DeceIntervencionObsRecomendacion

--DROP TABLE dbo.DeceSesionSeguimiento 
--DROP TABLE dbo.DeceSesionSeguimientoDetalle

--DROP TABLE dbo.DeceAtencionRepresentante

--DROP TABLE dbo.DeceAtencionAlumno

--DROP TABLE dbo.DeceSeguimientoCasoIndividual
--DROP TABLE dbo.DeceCompromisoRepresentante
--DROP TABLE dbo.DeceCompromisoRepresentanteDetalle

--ALTER TABLE dbo.DeceDeteccionRemisionCaso ALTER COLUMN codigo VARCHAR(50) NOT NULL 
--ALTER TABLE dbo.DeceDeteccionRemisionCaso ADD UNIQUE(codigo)

--ALTER TABLE dbo.DeceSociodemografico ALTER COLUMN codigo VARCHAR(50) NOT NULL 
--ALTER TABLE dbo.DeceSociodemografico ADD UNIQUE(codigo)

--ALTER TABLE dbo.DeceAtencionAlumno ALTER COLUMN codigo VARCHAR(50) NOT NULL 
--ALTER TABLE dbo.DeceAtencionAlumno ADD UNIQUE(codigo)

--ALTER TABLE dbo.DeceAtencionRepresentante ALTER COLUMN codigo VARCHAR(50) NOT NULL
--ALTER TABLE dbo.DeceAtencionRepresentante ADD UNIQUE(codigo)

--ALTER TABLE dbo.DeceCompromisoRepresentante ALTER COLUMN codigo VARCHAR(50) NOT NULL
--ALTER TABLE dbo.DeceCompromisoRepresentante ADD UNIQUE(codigo)

--ALTER TABLE DeceSociodemografico
--ADD idSucursal INT
--ALTER TABLE DeceSociodemografico
--ADD gestion	 INT
--ALTER TABLE DeceSociodemografico
--ADD idUsuario  INT
--ALTER TABLE DeceSociodemografico
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceSociodemografico
--ADD idRol INT
--ALTER TABLE DeceSociodemografico
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceSociodemografico
--ADD idModalidad INT
--ALTER TABLE DeceSociodemografico
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceSociodemografico
--ADD idGrado  INT
--ALTER TABLE DeceSociodemografico
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceSociodemografico
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceSociodemografico
--ADD idParalelo INT
--ALTER TABLE DeceSociodemografico
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceSociodemografico
--ADD idTurno INT
--ALTER TABLE DeceSociodemografico
--ADD turno VARCHAR(100)


GO
IF OBJECT_ID('F_ObtieneFechaHoraActualEcuador') IS NOT NULL
	DROP FUNCTION [dbo].[F_ObtieneFechaHoraActualEcuador]
GO
-- =============================================
-- Author:		Miguel Miño
-- Create date: '2020-07-14'
-- Description:	obtiene fecha con hora actual de ecuador eastern standard time (EST)
-- =============================================
CREATE FUNCTION [dbo].[F_ObtieneFechaHoraActualEcuador]()
RETURNS DATETIME
AS
BEGIN
	DECLARE
	@FechaHoraEcuador DATETIME

	/* OBTIENE HORA MEDIANTE ZONA HORARIA EST */
	--SET @FechaHoraEcuador = GETDATE() AT TIME ZONE 'Eastern Standard Time' AT TIME ZONE 'UTC' AS OrderDate_TimeZoneUTC 

	/* OBTIENE HORA MEDIANTE ZONA HORARIA UTC (+00:00) Y AGREGANDO LA ZONA HORARIA DE ECUADOR */	
	--SET @FechaHoraEcuador = TODATETIMEOFFSET(GETUTCDATE(), '+05:00') AT TIME ZONE 'UTC' Hora_Ecuador

	/* OBTIENE HORA MEDIANTE RESTA DE 5 HORAS A LA HORA DE GRENWICH UTC */
	SET @FechaHoraEcuador = DATEADD(HOUR, -5, GETUTCDATE())
	
	RETURN @FechaHoraEcuador;
END
GO
IF OBJECT_ID('EstadoCivil') IS NULL 
	BEGIN 
	CREATE TABLE [dbo].[EstadoCivil](
		[CodEstadoCivil] [int] IDENTITY(1,1) NOT NULL,
		[Descripcion] [nvarchar](50) NOT NULL,
		[Estado] [bit] NOT NULL,
	PRIMARY KEY CLUSTERED 
	(
		[CodEstadoCivil] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]

	SET IDENTITY_INSERT [dbo].[EstadoCivil] ON
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (1, N'Soltero', 1)
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (2, N'Casado', 1)
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (3, N'Viudo', 1)
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (4, N'Divorciado ', 1)
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (5, N'Union Libre', 1)
	INSERT [dbo].[EstadoCivil] ([CodEstadoCivil], [Descripcion], [Estado]) VALUES (6, N'Otro', 1)
	SET IDENTITY_INSERT [dbo].[EstadoCivil] OFF
	END
GO
IF OBJECT_ID('Genero') IS NULL 
	BEGIN
	CREATE TABLE [dbo].[Genero](
		[CodGenero] [int] IDENTITY(1,1) NOT NULL,
		[Descripcion] [nvarchar](10) NULL,
		[Cod] [nchar](10) NULL,
		[Estado] [int] NULL,
	PRIMARY KEY CLUSTERED 
	(
		[CodGenero] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
	
	SET IDENTITY_INSERT [dbo].[Genero] ON 
	INSERT [dbo].[Genero] ([CodGenero], [Descripcion], [Cod], [Estado]) VALUES (1, N'Masculino', N'M         ', 1)
	INSERT [dbo].[Genero] ([CodGenero], [Descripcion], [Cod], [Estado]) VALUES (2, N'Femenino', N'F         ', 1)
	SET IDENTITY_INSERT [dbo].[Genero] OFF
	END
GO
IF OBJECT_ID('Religion') IS NULL 
	BEGIN
	CREATE TABLE [dbo].[Religion](
		[CodReligion] [int] IDENTITY(1,1) NOT NULL,
		[Descripcion] [nvarchar](50) NOT NULL,
		[Estado] [bit] NOT NULL,
		[Nombre] [nvarchar](100) NULL,
		[Orden] [int] NULL,
	PRIMARY KEY CLUSTERED 
	(
		[CodReligion] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]

	SET IDENTITY_INSERT [dbo].[Religion] ON 
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (1, N'Adventista', 1, N'Adventista', 1)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (2, N'Adventista Reformista', 1, N'Adventista Reformista', 2)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (3, N'Evangélica', 1, N'Evangélica', 3)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (5, N'Católica', 1, N'Católica', 4)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (6, N'Mormon', 1, N'Mormon', 5)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (7, N'Cristiana', 1, N'Cristiana', 6)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (8, N'Ateo', 1, N'Ateo', 8)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (9, N'Otra', 1, N'Otra', 9)
	INSERT [dbo].[Religion] ([CodReligion], [Descripcion], [Estado], [Nombre], [Orden]) VALUES (10, N'Bautista', 1, N'Bautista', 7)
	SET IDENTITY_INSERT [dbo].[Religion] OFF
	END
GO
IF OBJECT_ID('TipoRelacion') IS NULL 
	BEGIN
	CREATE TABLE [dbo].[TipoRelacion](
		[IdTipoRelacion] [int] IDENTITY(1,1) NOT NULL,
		[Descripcion] [nvarchar](50) NOT NULL,
		[PosibleResponsable] [bit] NULL,
		[Estado] [bit] NOT NULL,
		[Codigo] [int] NOT NULL,
		[moduloDece] [bit] NULL,
	PRIMARY KEY CLUSTERED 
	(
		[IdTipoRelacion] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]

	SET IDENTITY_INSERT [dbo].[TipoRelacion] ON 
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (1, N'Padre', 1, 1, 1, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (2, N'Madre', 1, 1, 2, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (3, N'Hijo', NULL, 1, 3, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (4, N'Hija', NULL, 1, 4, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (5, N'Hermano', 1, 1, 5, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (6, N'Hermana', 1, 1, 6, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (7, N'Tio', 1, 1, 7, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (8, N'Tia', 1, 1, 8, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (9, N'Sobrino', NULL, 1, 9, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (10, N'Sobrina', NULL, 1, 10, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (11, N'Abuelo', 1, 1, 11, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (12, N'Abuela', 1, 1, 12, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (13, N'Primo', 1, 1, 13, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (14, N'Prima', 1, 1, 14, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (15, N'Nieto', NULL, 1, 15, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (16, N'Nieta', NULL, 1, 16, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (17, N'Tutor', 1, 1, 17, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (18, N'Tutorado', NULL, 1, 18, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (19, N'Padrastro', 1, 1, 19, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (20, N'Madrastra', 1, 1, 20, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (21, N'Hijastro', 0, 1, 21, 1)
	INSERT [dbo].[TipoRelacion] ([IdTipoRelacion], [Descripcion], [PosibleResponsable], [Estado], [Codigo], [moduloDece]) VALUES (22, N'Hijastra', 0, 1, 22, 1)
	SET IDENTITY_INSERT [dbo].[TipoRelacion] OFF
	
	ALTER TABLE [dbo].[TipoRelacion] ADD  DEFAULT ((1)) FOR [Estado]
	END
GO
-------------------------------------------------------------------------------------------------------------------------------------------------------------
IF OBJECT_ID('DeceSociodemografico') IS NULL 
	CREATE TABLE dbo.DeceSociodemografico (
		idDeceSociodemografico INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo VARCHAR(50) NOT NULL UNIQUE
	,   idSucursal INT NOT NULL
	,   gestion	 INT NOT NULL
	,   idUsuario  INT NOT NULL
	,   nombreUsuario	VARCHAR(50) NOT NULL
	,   idRol INT NOT NULL
	,   nombreRol	VARCHAR(50) NOT NULL
	,   idModalidad INT NOT NULL
	,   modalidad VARCHAR(100) NOT NULL
	,   idGrado  INT NOT NULL
	,   codigoGrado	VARCHAR(50) NOT NULL
	,   descripcionGrado VARCHAR(100) NOT NULL
	,   idParalelo INT NOT NULL
	,   paralelo VARCHAR(100) NOT NULL
	,   idTurno INT NOT NULL
	,   turno VARCHAR(100) NOT NULL
	,	codAlumno INT NOT NULL 
	,	nombreAlumno VARCHAR(500) NOT NULL
	,	curso VARCHAR(100) NOT NULL
	,	fechaEntrevista DATETIME NOT NULL
	,	lugarNacimiento VARCHAR(500) NOT NULL
	,	fechaNacimiento DATETIME NOT NULL
	,	domicilio VARCHAR(500) NOT NULL
	,	sector VARCHAR(500) NOT NULL
	,	cambioDomicilio VARCHAR(500) NOT NULL
	,	contacto VARCHAR(50) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)
IF OBJECT_ID('DeceSDInstruccionOpcion') IS NULL 
	BEGIN 
	CREATE TABLE dbo.DeceSDInstruccionOpcion (
		idDeceSDInstruccionOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	descripcion VARCHAR(50) NOT NULL
	,	observacion VARCHAR(500) NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDInstruccionOpcion(codigo, descripcion, observacion, estado)
	VALUES	(1, 'Personas analfabetas', 'Personas que no saben leer ni escribir.', 1)
	,		(2, 'Sin estudios', 'Personas que saben leer y escribir pero no han terminado ningún tipo de estudios.', 1)
	,		(3, 'Primarios', 'Educación Infantil, Maternal, Guarderías, Jardín de Infancia, Párvulos y similares, Educación Primaria, Educación de adultos EPA, Educación Especial, Estudios oficiales de música (ciclo elemental), estudios primarios anteriores como la EGB, la Enseñanza Primaria y estudios similares.', 1)
	,		(4, 'Profesionales', 'Estudios de Formación Profesional: Módulos Profesionales, FP de primer y segundo grado, Ciclos Formativos de ciclo medio y ciclo superior, Programas de Cualificación Profesional Inicial, Formación Profesional Básica y otros estudios profesionales o artísticos.', 1)
	,		(5, 'Secundarios', 'Estudios de Bachillerato Elemental y equivalentes, de Educación Secundaria Obligatoria, de Reforma de Enseñanzas Medias, de Bachiller Superior o BUP, de Bachillerato LOGSE o LOE, Estudios oficiales de idiomas, Acceso a la Universidad y similares.', 1)
	,		(6, 'Medio-superiores', 'Estudios de Ingeniería Técnica, Peritaje industrial, Magisterio, Enfermería, Diplomatura, estudios universitarios de primer ciclo, estudios de especialización de carreras medias y otros del mismo nivel.', 1)
	,		(7, 'Superiores', 'Estudios universitarios de Grado, Licenciatura, Ingeniería Superior y similares, así como de tercer ciclo, postgrados, máster, doctorado y especialización.', 1)
	END
IF OBJECT_ID('DeceSDDatoFamiliar') IS NULL 
	CREATE TABLE dbo.DeceSDDatoFamiliar (
		idDeceSDDatoFamiliar INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDDatoFamiliar
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	--,	puntoIIDatoFamilia BIT NOT NULL
	--,	puntoIIIHnoEstudiaColegio BIT NOT NULL
	,	numeroItem INT NOT NULL
	,	idTipoRelacion INT NOT NULL
					CONSTRAINT FK_idTipoRelacion_DeceSDDatoFamiliar
					FOREIGN KEY (idTipoRelacion)
					REFERENCES dbo.TipoRelacion(idTipoRelacion)
	,	primerApellido	VARCHAR(20) NOT NULL
	,	segundoApellido VARCHAR(20)		NULL
	,	primerNombre	VARCHAR(20) NOT NULL
	,	segundoNombre	VARCHAR(20)		NULL
	,	fechaNacimiento DATETIME NOT NULL
	,	idEstadoCivil INT NOT NULL
					CONSTRAINT FK_codEstadoCivil_DeceSDDatoFamiliar
					FOREIGN KEY (idEstadoCivil)
					REFERENCES dbo.EstadoCivil(codEstadoCivil)
	,	idDeceSDInstruccionOpcion INT NOT NULL
					CONSTRAINT FK_idDeceSDInstruccionOpcion_DeceSDDatoFamiliar
					FOREIGN KEY (idDeceSDInstruccionOpcion)
					REFERENCES dbo.DeceSDInstruccionOpcion(idDeceSDInstruccionOpcion)
	,	profesionOcupacion VARCHAR(500) NULL
	,	lugarTrabajoEmpresa VARCHAR(500) NULL
	,	ingreso DECIMAL(18,5) NULL
	,	idReligion INT NULL
					CONSTRAINT FK_idReligion_DeceSDDatoFamiliar
					FOREIGN KEY (idReligion)
					REFERENCES dbo.Religion(codReligion)
	)
IF OBJECT_ID('DeceSDContactoOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDContactoOpcion (
		idDeceSDContactoOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(10) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDContactoOpcion(codigo, opcionTipo, nombrePropiedad, descripcion, fechaRegistro,estado)
	VALUES	(1,2,'telefono', 'Teléfono', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2,2,'celular', 'Celular', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guarda tipo de contactos por formulario socio demografico punto datos familiares*/
IF OBJECT_ID('DeceSDDatoFamiliarContacto') IS NULL 
	CREATE TABLE dbo.DeceSDDatoFamiliarContacto (

		idDeceSDDatoFamiliarContacto INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSDDatoFamiliar INT NULL
											CONSTRAINT FK_idDeceSDDatoFamiliar_DeceSDDatoFamiliarContacto
											FOREIGN KEY (idDeceSDDatoFamiliar) 
											REFERENCES dbo.DeceSDDatoFamiliar(idDeceSDDatoFamiliar)
	,	idDeceSociodemografico INT NULL
											CONSTRAINT FK_idDeceSociodemografico_DeceSDDatoFamiliarContacto
											FOREIGN KEY (idDeceSociodemografico) 
											REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDContactoOpcion INT NOT NULL 
			CONSTRAINT FK_idDeceSDContactoOpcion_DeceSDDatoFamiliarContacto 
			FOREIGN KEY (idDeceSDContactoOpcion) 
			REFERENCES dbo.DeceSDContactoOpcion(idDeceSDContactoOpcion)
	,	descripcion VARCHAR(20) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Tipo Ingresos Egresos Familia */
IF OBJECT_ID('DeceSDIngresoEgresoFamiliaOpcion') IS NULL 	
	BEGIN
	CREATE TABLE dbo.DeceSDIngresoEgresoFamiliaOpcion (
		idDeceSDIngresoEgresoFamiliaOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(20) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDIngresoEgresoFamiliaOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 0, NULL,'padre', 'Padre', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 0, NULL,'madre', 'Madre', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 0, NULL,'otros', 'Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 0, NULL,'totalIngreso', 'Total Ingreso', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 0, NULL,'totalEgresos', 'Total Egresos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Ingresos Egresos Familia */
IF OBJECT_ID('DeceSDIngresoEgresoFamilia') IS NULL 
	CREATE TABLE dbo.DeceSDIngresoEgresoFamilia (
		idDeceSDIngresoEgresoFamilia INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					  CONSTRAINT FK_idDeceSociodemografico_DeceSDIngresoEgresoFamilia
					  FOREIGN KEY (idDeceSociodemografico) 
					  REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	valorPadre	  DECIMAL(18,5) NOT NULL
	,	valorMadre	  DECIMAL(18,5) NOT NULL
	,	valorOtros	  DECIMAL(18,5) NOT NULL
	,	valorIngresos DECIMAL(18,5) NOT NULL
	,	valorEgresos  DECIMAL(18,5) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Tipo de condicion de vivienda */
IF OBJECT_ID('DeceSDViviendaCondicionOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDViviendaCondicionOpcion (
		idDeceSDViviendaCondicionOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(100) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDViviendaCondicionOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 1, 'vivienda', 'propia', 'Propia', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 1, 'vivienda', 'arrendada', 'Arrendada', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 1, 'vivienda', 'prestada', 'Prestada', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 1, 'vivienda', 'anticresis', 'Anticresis', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 1, 'vivienda', 'conPrestamo', 'Con préstamo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 0, NULL, 'descripcion', 'Breve descripción de la vivienda (casa, departamento, cuarto, etc) ', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Dato de condición vivienda */
IF OBJECT_ID('DeceSDViviendaCondicion') IS NULL 
	CREATE TABLE dbo.DeceSDViviendaCondicion (
		idDeceSDViviendaCondicion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDViviendaCondicion
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDViviendaCondicionOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDViviendaCondicionOpcion_DeceSDViviendaCondicion 
								FOREIGN KEY (idDeceSDViviendaCondicionOpcion) 
								REFERENCES dbo.DeceSDViviendaCondicionOpcion(idDeceSDViviendaCondicionOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Tipo de servicio vivienda*/
IF OBJECT_ID('DeceSDViviendaServicioOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDViviendaServicioOpcion (
		idDeceSDViviendaServicioOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(20) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDViviendaServicioOpcion(codigo, opcionTipo, atributoName,nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 2, NULL, 'luzElectrica', 'Luz Eléctrica', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 2, NULL, 'aguaPotable', 'Agua Potable', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 2, NULL, 'sshh', 'SSHH', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 2, NULL, 'pozoSeptico', 'Pozo séptico', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 2, NULL, 'telefono', 'Teléfono', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 2, NULL, 'cable', 'Cable', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 2, NULL, 'celular', 'Celular', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 2, NULL, 'pcInternet', 'Computador/Internet', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(9, 0, NULL, 'Observacion', 'Observaciones', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Dato de servicios de vivienda */
IF OBJECT_ID('DeceSDViviendaServicio') IS NULL 
	CREATE TABLE dbo.DeceSDViviendaServicio (
		idDeceSDViviendaServicio INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDViviendaServicio
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDViviendaServicioOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDViviendaServicioOpcion_DeceSDViviendaServicio
								FOREIGN KEY (idDeceSDViviendaServicioOpcion) 
								REFERENCES dbo.DeceSDViviendaServicioOpcion(idDeceSDViviendaServicioOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Preguntas ) de embarazo y Parto*/
IF OBJECT_ID('DeceSDEmbarazoPartoOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDEmbarazoPartoOpcion (
		idDeceSDEmbarazoPartoOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
)

	INSERT INTO dbo.DeceSDEmbarazoPartoOpcion (codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 0, NULL, 'edadMadre', 'Edad de la Madre', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 0, NULL, 'accidenteEmbarazo', 'Accidentes en el Embarazo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 0, NULL, 'estadoEmocionalEmbarazo', '¿Cómo fue su estado emocional durante el embarazo?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 0, NULL, 'hechoEfectoEstadoEmocional', '¿Hubo algún hecho que pudo afectar su estado emocional?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 0, NULL, 'medicamentoEmbarazo', 'Medicamentos durante el embarazo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 1, 'estadoParto', 'alTermino', 'Al Término', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 1, 'estadoParto', 'prematuro', 'Prematuro', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 1, 'estadoParto', 'cesarea', 'Cesárea', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(9, 1, 'estadoParto', 'partoNormal', 'Parto Normal', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(10, 0,NULL,  'otrasDificultades', 'Especificar cualquier otra dificultad en el embarazo (preclamsia, hipoxia, etc)', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones de Embarazo y Parto */
IF OBJECT_ID('DeceSDEmbarazoParto') IS NULL 
	CREATE TABLE dbo.DeceSDEmbarazoParto (
		idDeceSDEmbarazoParto INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDEmbarazoParto
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDEmbarazoPartoOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDEmbarazoPartoOpcion_DeceSDEmbarazoParto
								FOREIGN KEY (idDeceSDEmbarazoPartoOpcion) 
								REFERENCES dbo.DeceSDEmbarazoPartoOpcion(idDeceSDEmbarazoPartoOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Pregunta) Ninio recien nacido */
IF OBJECT_ID('DeceSDDatoNinioRecienNacidoOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDDatoNinioRecienNacidoOpcion (
		idDeceSDDatoNinioRecienNacidoOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDDatoNinioRecienNacidoOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 0, NULL, 'pesoNacer', 'Peso al nacer', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 0, NULL, 'tallaNacer', 'Talla al nacer', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 0, NULL, 'edadCaminar', 'Edad en que empezó a caminar', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 0, NULL, 'edadHablar', 'Edad a la que hablo por primera vez', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 0, NULL, 'periodoLactancia', 'Período de lactancia', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 0, NULL, 'edadUsoBiberon', 'Edad hasta la cual utilizó biberón', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 0, NULL, 'edadControlEsfinter', 'Edad en que aprendió a controlar esfínteres', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 0, NULL, 'sufrioEnuresis', '¿Sufrió una enuresis?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones(Pregunta) Ninio recien nacido */
IF OBJECT_ID('DeceSDDatoNinioRecienNacido') IS NULL 
	CREATE TABLE dbo.DeceSDDatoNinioRecienNacido (
		idDeceSDDatoNinioRecienNacido INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDDatoNinioRecienNacido
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	pesoNacer VARCHAR(100) NOT NULL
	,	tallaNacer VARCHAR(100) NOT NULL
	,	edadCaminar VARCHAR(100) NOT NULL
	,	edadHablar VARCHAR(100) NOT NULL
	,	periodoLactancia VARCHAR(100) NOT NULL
	,	edadUsoBiberon VARCHAR(100) NOT NULL
	,	edadControlEsfinter VARCHAR(100) NOT NULL
	,	sufrioEnuresis VARCHAR(3000) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Pregunta) Accidentes Patologicos familiares */
IF OBJECT_ID('DeceSDAntecedentePatologicoFamiliaOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDAntecedentePatologicoFamiliaOpcion (
		idDeceSDAntecedentePatologicoFamiliaOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDAntecedentePatologicoFamiliaOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 4, NULL, 'diabetes', 'Diabetes',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 4, NULL, 'hipertension', 'Hipertensión',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 4, NULL, 'epilepsia', 'Epilepsia',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 4, NULL, 'obesidad', 'Obesidad',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 4, NULL, 'enfermedadCardiaca', 'Enfermedades Cardíacas',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 4, NULL, 'otraEnfermedad', 'Otras Enfermedades',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 4, NULL, 'retardoMental', 'Retardo Mental',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 4, NULL, 'alcoholismo', 'Alcoholismo',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(9, 4, NULL, 'farmacoDependencia', 'Fármaco Dependencia',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(10, 4,NULL,  'ceguera', 'Ceguera',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(11, 4,NULL,  'sordera', 'Sordera',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(12, 4,NULL,  'paralisis', 'Parálisis',dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones(Pregunta) Accidentes Patologicos familiares */
IF OBJECT_ID('DeceSDAntecedentePatologicoFamilia') IS NULL 
	CREATE TABLE dbo.DeceSDAntecedentePatologicoFamilia (
		idDeceSDAntecedentePatologicoFamilia INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDAntecedentePatologicoFamilia
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDAntecedentePatologicoFamiliaOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDAntecedentePatologicoFamiliaOpcion_DeceSDAntecedentePatologicoFamilia
								FOREIGN KEY (idDeceSDAntecedentePatologicoFamiliaOpcion) 
								REFERENCES dbo.DeceSDAntecedentePatologicoFamiliaOpcion(idDeceSDAntecedentePatologicoFamiliaOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Pregunta) Antecedente Dificultad Escolar */
IF OBJECT_ID('DeceSDAntecedenteDificultadEscolarOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDAntecedenteDificultadEscolarOpcion (
		idDeceSDAntecedenteDificultadEscolarOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDAntecedenteDificultadEscolarOpcion(codigo, opcionTipo, atributoName ,  nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 2, NULL, 'dislexia', 'Dislexia', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 2, NULL, 'digrafias', 'Digrafías', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 2, NULL, 'discalculias', 'Discalculias', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 2, NULL, 'problemaLenguaje', 'Problemas de lenguajes', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 2, NULL, 'problemaAtencion', 'Problemas de Atención', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 2, NULL, 'problemaMotor', 'Problemas Motores', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 2, NULL, 'problemaVisomotor', 'Problemas Visomotores', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 2, NULL, 'problemaAuditivo', 'Problemas en discriminación auditiva', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(9, 0, NULL, 'otraDificultad', 'Otras dificultades', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(10, 0,NULL,  'cuandoDetectaron', '¿Cuándo lo detectaron?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(11, 0,NULL,  'comoQuienAyuaEnsenanza', '¿Cómo y quienes lo ayudaron en su proceso de enseñanza y aprendizaje?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones(Pregunta) Antecedente Dificultad Escolar */
IF OBJECT_ID('DeceSDAntecedenteDificultadEscolar') IS NULL 
	CREATE TABLE dbo.DeceSDAntecedenteDificultadEscolar (
		idDeceSDAntecedenteDificultadEscolar INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDAntecedenteDificultadEscolar
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDAntecedenteDificultadEscolarOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDAntecedenteDificultadEscolarOpcion_DeceSDAntecedenteDificultadEscolar
								FOREIGN KEY (idDeceSDAntecedenteDificultadEscolarOpcion) 
								REFERENCES dbo.DeceSDAntecedenteDificultadEscolarOpcion(idDeceSDAntecedenteDificultadEscolarOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Pregunta) Datos Salud */
IF OBJECT_ID('DeceSDDatoSaludOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDDatoSaludOpcion (
		idDeceSDDatoSaludOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDDatoSaludOpcion(codigo, opcionTipo, atributoName , nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 4, NULL, 'tieneDiscapacidad', 'El estudiante tiene algún tipo de discapacidad', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 4, NULL, 'tieneCondicionMedica', 'El estudiante tiene alguna condición médica específica', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 4, NULL, 'tieneAlergias', 'El estudiante padece de alergias', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 0, NULL, 'medicamentoUtiliza', 'Especificar medicamentos que utiliza', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 2, NULL, 'atencionMedicaCentroSalud', 'Estudiante recibe atención médica (Centro de Salud)', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 2, NULL, 'atencionMedicaSubCentroSalud', 'Estudiante recibe atención médica (SubCentro de Salud)', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 2, NULL, 'atencionMedicaHospitalPublico', 'Estudiante recibe atención médica (Hospital Público)', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(8, 2, NULL, 'atencionMedicaHospitalPrivado', 'Estudiante recibe atención médica (Hospital Privado)', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(9, 0, NULL,'nombreMedicoRegular', 'Nombre del médico que atiende regularmente al estudiante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(10, 0,NULL, 'observaciones', 'Observaciones', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(11, 4,NULL, 'familiarTieneDiscapacidad', 'Familiares con algún tipo de discapacidad', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones(Pregunta) Antecedente Dificultad Escolar */
IF OBJECT_ID('DeceSDDatoSalud') IS NULL 
	CREATE TABLE dbo.DeceSDDatoSalud (
		idDeceSDDatoSalud INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDDatoSalud
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDDatoSaludOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDDatoSaludOpcion_DeceSDDatoSalud
								FOREIGN KEY (idDeceSDDatoSaludOpcion) 
								REFERENCES dbo.DeceSDDatoSaludOpcion(idDeceSDDatoSaludOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)

/* Opciones(Pregunta) Datos Salud */
IF OBJECT_ID('DeceSDHistoriaEducacionalOpcion') IS NULL 
	BEGIN
	CREATE TABLE dbo.DeceSDHistoriaEducacionalOpcion (
		idDeceSDHistoriaEducacionalOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(500) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceSDHistoriaEducacionalOpcion(codigo, opcionTipo, atributoName,  nombrePropiedad, descripcion, fechaRegistro, estado)
	VALUES	(1, 0,NULL, 'institucionProcedencia', 'Institución educativa de la que procede', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 4,NULL, 'gradoRepetido', '¿Ha repetido algún año?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 4,NULL, 'problemaConducta', '¿Presenta algún problema de conducta en la institución?', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 4,NULL, 'logroAcademico', 'Logros académicos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 4,NULL, 'clubes', 'Clubes', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 0,NULL, 'extracurriculares', 'Extracurriculares', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, 0,NULL, 'tareasTiempoDiario', 'Cuántas tareas tiene diariamente y el tiempo que les dedica', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
/* Guardo Opciones(Pregunta) Antecedente Dificultad Escolar */

IF OBJECT_ID('DeceSDHistoriaEducacional') IS NULL 
	CREATE TABLE dbo.DeceSDHistoriaEducacional (
		idDeceSDHistoriaEducacional INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceSociodemografico INT NOT NULL 
					CONSTRAINT FK_idDeceSociodemografico_DeceSDHistoriaEducacional
					FOREIGN KEY (idDeceSociodemografico) 
					REFERENCES dbo.DeceSociodemografico(idDeceSociodemografico)
	,	idDeceSDHistoriaEducacionalOpcion INT NOT NULL 
								CONSTRAINT FK_idDeceSDHistoriaEducacionalOpcion_DeceSDHistoriaEducacional
								FOREIGN KEY (idDeceSDHistoriaEducacionalOpcion) 
								REFERENCES dbo.DeceSDHistoriaEducacionalOpcion(idDeceSDHistoriaEducacionalOpcion)
	,	descripcion VARCHAR(500) NULL
	,	fechaRegistro DATETIME NOT NULL
	)
	

/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 2 Formulario DETECCION Y REMISION DE CASOS DE ESTUDIANTES
	=============== *************************************************************************************************************************************
	===============
*/
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idSucursal INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD gestion	 INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idRol INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idModalidad INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idGrado  INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idParalelo INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD idTurno INT
--ALTER TABLE DeceDeteccionRemisionCaso
--ADD turno VARCHAR(100)
IF OBJECT_ID('DeceDeteccionRemisionCaso') IS NULL
	CREATE TABLE dbo.DeceDeteccionRemisionCaso (
		idDeceDeteccionRemisionCaso INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo VARCHAR(50) NOT NULL UNIQUE
	,	estadoVersion VARCHAR(10) NOT NULL
	,	estadoCierre BIT NOT NULL
	,   idSucursal INT NOT NULL
	,   gestion	 INT NOT NULL
	,   idUsuario  INT NOT NULL
	,   nombreUsuario	VARCHAR(50) NOT NULL
	,   idRol INT NOT NULL
	,   nombreRol	VARCHAR(50) NOT NULL
	,   idModalidad INT NOT NULL
	,   modalidad VARCHAR(100) NOT NULL
	,   idGrado  INT NOT NULL
	,   codigoGrado	VARCHAR(50) NOT NULL
	,   descripcionGrado VARCHAR(100) NOT NULL
	,   idParalelo INT NOT NULL
	,   paralelo VARCHAR(100) NOT NULL
	,   idTurno INT NOT NULL
	,   turno VARCHAR(100) NOT NULL
	,	fechaDeteccionRemision DATETIME NOT NULL
	,	codAlumno INT NOT NULL
	,	nombreAlumno VARCHAR(500) NOT NULL
	,	curso VARCHAR(50) NOT NULL
	,	fechaNacimiento DATETIME NOT NULL
	,	fechaReporte DATETIME NOT NULL
	,	codigoReportadoX INT NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)
--select max(len(descripcion)), Descripcion from dbo.Grado group by Descripcion
IF OBJECT_ID('DeceDRCMotivoReporteOpcion') IS NULL
	BEGIN
	CREATE TABLE dbo.DeceDRCMotivoReporteOpcion (
		idDeceDRCMotivoReporteOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	codigo INT NOT NULL UNIQUE
	,	descripcion VARCHAR(50) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceDRCMotivoReporteOpcion(codigo, descripcion, fechaRegistro, estado)
	VALUES	(1, 'COGNITIVO', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, 'AFECTIVO', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, 'CONDUCTUAL', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, 'MOTRIZ', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, 'ACADÉMICO', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, 'SENSORIAL/FÍSICA', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
IF OBJECT_ID('DeceDRCMotivoReporteOpcionDetalle') IS NULL
	BEGIN
	CREATE TABLE dbo.DeceDRCMotivoReporteOpcionDetalle (
		idDeceDRCMotivoReporteOpcionDetalle INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceDRCMotivoReporteOpcion INT NOT NULL 
					CONSTRAINT FK_idDeceDRCMotivoReporteOpcion_DeceDRCMotivoReporteOpcionDetalle
					FOREIGN KEY (idDeceDRCMotivoReporteOpcion) 
					REFERENCES dbo.DeceDRCMotivoReporteOpcion(idDeceDRCMotivoReporteOpcion)
	,	codigo INT NOT NULL /* no es unique por si se repite por tabla padre*/
	,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
	,	atributoName VARCHAR(50) NULL
	,	nombrePropiedad VARCHAR(50) NOT NULL
	,	descripcion VARCHAR(50) NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	,	estado BIT NOT NULL
	)

	INSERT INTO dbo.DeceDRCMotivoReporteOpcionDetalle (codigo, idDeceDRCMotivoReporteOpcion, opcionTipo, atributoName, nombrePropiedad, descripcion, fecharegistro, estado)
	VALUES	(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (1)), 2, NULL, 'atencion', 'Atención', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (1)), 2, NULL, 'concentracion', 'Concentración', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (1)), 2, NULL, 'memoria', 'Memoria', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (1)), 2, NULL, 'razonamiento', 'Razonamiento', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (1)), 2, NULL, 'agilidadMental', 'Agilidad mental', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'aislamiento', 'Aislamiento', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'cambioAnimo', 'Cambio de ánimo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'busquedaAprobacion', 'Búsqueda aprobación', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'desmotivacion', 'Desmotivación', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'problemaFamiliar', 'Problemas Familiares', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'autolesione', 'Autolesiones', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (2)), 2, NULL, 'vulnerabilidad', 'Vulnerabilidad', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'dificultadPaticipacionAula', 'Dificultad participación en aula', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'dificultadTrabajoGrupo', 'Dificultad trabajo en grupo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'conductaAgresiva', 'Conductas agresivas', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'noSigueInstruccion', 'No sigue intrucciones', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'camaraApagada', 'Cámara apagada', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'inasistencia', 'Inasistencia', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (3)), 2, NULL, 'deshonestidadAcademica', 'Deshonestidad académica', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (4)), 2, NULL, 'dificultadMotricidadGruesa', 'Dificultad motricidad gruesa', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (4)), 2, NULL, 'dificultadMotricidadFina', 'Dificultad motricidad fina', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'bajoRendimiento', 'Bajo rendimiento', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'incumplimientoTarea', 'Incumplimiento tareas', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'noPresentaMaterialTrabajo', 'No presenta material de trabajo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'irresponsabilidadAula', 'Irresponsabilidad en el aula', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'dificultadLectura', 'Dificultad de lectura', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(6, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'dificultadEscritura', 'Dificultad de escritura', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(7, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (5)), 2, NULL, 'dificultadCalculo', 'Dificultad de cálculo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

	,		(1, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (6)), 2, NULL, 'problemaAudicion', 'Problema de audición', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(2, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (6)), 2, NULL, 'problemaVision', 'Problema de visión', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(3, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (6)), 2, NULL, 'problemaLenguaje', 'Problema de lenguaje', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(4, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (6)), 2, NULL, 'orientacionTemporoEspacial', 'Orientación temporo-espacial', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	,		(5, (SELECT idDeceDRCMotivoReporteOpcion FROM dbo.DeceDRCMotivoReporteOpcion WHERE codigo IN (6)), 2, NULL, 'salud', 'Salud', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
	END
IF OBJECT_ID('DeceDRCMotivoReporte') IS NULL
	BEGIN
	CREATE TABLE dbo.DeceDRCMotivoReporte	(
		idDeceDRCMotivoReporte INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idDeceDeteccionRemisionCaso INT NOT NULL 
					CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCMotivoReporte
					FOREIGN KEY (idDeceDeteccionRemisionCaso) 
					REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
	,	idDeceDRCMotivoReporteOpcionDetalle INT NOT NULL
					CONSTRAINT FK_idDeceDRCMotivoReporteOpcionDetalle_DeceDRCMotivoReporte
					FOREIGN KEY (idDeceDRCMotivoReporteOpcionDetalle) 
					REFERENCES dbo.DeceDRCMotivoReporteOpcionDetalle(idDeceDRCMotivoReporteOpcionDetalle)
	,	fechaRegistro DATETIME NOT NULL
	,	idUsuario INT NULL /* no relacionado porque aun está por confirmar estructura*/
	)
	END
IF OBJECT_ID('DeceDRCDescripcionCasoItem3') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCDescripcionCasoItem3 (
	idDeceDRCDescripcionCasoItem3 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCDescripcionCasoItem3
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso) 
,	descripcion VARCHAR(MAX) NULL	
,	idUsuario INT NULL /* no relacionado porque aun está por confirmar estructura*/
)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem4Opcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem4Opcion(
	idDeceDRCInformeSeguimientoItem4Opcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)
INSERT  INTO dbo.DeceDRCInformeSeguimientoItem4Opcion(codigo,opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
VALUES	(1,2, NULL,'comunicaRepresentante', 'Comunicacion al representante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2, NULL,'firmaAcuerdo', 'Firma acuerdos con el respresentante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2, NULL,'acuerdoEstudiante', 'Acuerdos con el estudiante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2, NULL,'refuerzoAcademico', 'Refuerzo Académico', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2, NULL,'comunicaTutor', 'Comunica al tutor', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2, NULL,'seguimientoEstudiante', 'Seguimiento al estudiante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,2, NULL,'deriva', 'Deriva', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(8,0, NULL,'otros', 'Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem4') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem4 (
	idDeceDRCInformeSeguimientoItem4 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCInformeSeguimientoItem4
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso) 
,	idDeceDRCInformeSeguimientoItem4Opcion INT NOT NULL 
				CONSTRAINT FK_idDeceDRCInformeSeguimientoItem4Opcion_DeceDRCInformeSeguimientoItem4
				FOREIGN KEY (idDeceDRCInformeSeguimientoItem4Opcion) 
				REFERENCES dbo.DeceDRCInformeSeguimientoItem4Opcion(idDeceDRCInformeSeguimientoItem4Opcion) 
,	descripcion VARCHAR(400)  NULL	
,	fechaRegistro DATETIME NOT NULL

)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem5Opcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem5Opcion(
	idDeceDRCInformeSeguimientoItem5Opcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT  INTO dbo.DeceDRCInformeSeguimientoItem5Opcion(codigo,opcionTipo,atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
VALUES	(1,2, NULL,'comunicaRepresentante', 'Comunicacion al representante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2, NULL,'firmaAcuerdo', 'Acuerdos con el respresentante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2, NULL,'acuerdoEstudiante', 'Realiza Acuerdos con el estudiante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2, NULL,'deriva', 'Deriva', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2, NULL,'refuerzoAcademico', 'Refuerzo Académico', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2, NULL,'siguimientoDocente', 'Seguimiento Docente', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,2, NULL,'resuelveConflictos', 'Resuelve Conflictos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(8,2, NULL,'tutoria', 'Tutoría', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(9,2, NULL,'visita', 'Visita', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(10,0,NULL, 'otros', 'Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem5') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem5(
	idDeceDRCInformeSeguimientoItem5 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCInformeSeguimientoItem5
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	idDeceDRCInformeSeguimientoItem5Opcion INT NOT NULL 
				CONSTRAINT FK_idDeceDRCInformeSeguimientoItem5Opcion_DeceDRCInformeSeguimientoItem5
				FOREIGN KEY (idDeceDRCInformeSeguimientoItem5Opcion) 
				REFERENCES dbo.DeceDRCInformeSeguimientoItem5Opcion(idDeceDRCInformeSeguimientoItem5Opcion)
,	descripcion VARCHAR(500)  NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCAcuerdoEstablecido') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCAcuerdoEstablecido(
	idDeceDRCAcuerdoEstablecido INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCAcuerdoEstablecido
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	acuerdoPadre VARCHAR(500) NOT NULL
,	acuerdoAlumno VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL 
)
END
IF OBJECT_ID('DeceDRCAccionRealizarItem6') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCAccionRealizarItem6(
	idDeceDRCAccionRealizarItem6 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCAccionRealizarItem6
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	descripcion VARCHAR(500) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem7Opcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem7Opcion(
	idDeceDRCInformeSeguimientoItem7Opcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT  INTO dbo.DeceDRCInformeSeguimientoItem7Opcion(codigo,opcionTipo,atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
VALUES	(1,2, NULL,'oracion', 'Oración', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2, NULL,'consejeria', 'Consejería', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2, NULL,'acuerdoPadres', 'Acuerdo con padres', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2, NULL,'acuerdoEstudiantes', 'Acuerdo con estudiantes', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2, NULL,'visitas', 'Visitas', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2, NULL,'derivada', 'Derivada', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,0, NULL,'otros', 'Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem7') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem7(
	idDeceDRCInformeSeguimientoItem7 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCInformeSeguimientoItem7
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,idDeceDRCInformeSeguimientoItem7Opcion INT NOT NULL 
				CONSTRAINT FK_idDeceDRCInformeSeguimientoItem7Opcion_DeceDRCInformeSeguimientoItem7
				FOREIGN KEY (idDeceDRCInformeSeguimientoItem7Opcion) 
				REFERENCES dbo.DeceDRCInformeSeguimientoItem7Opcion(idDeceDRCInformeSeguimientoItem7Opcion)
,	descripcion VARCHAR(500) NULL
,	fechaRegistro DATETIME NOT NULL

)
END
IF OBJECT_ID('DeceDRCAccionRealizarItem7') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCAccionRealizarItem7	(
	idDeceDRCAccionRealizarItem7 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCAccionRealizarItem7
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	descripcion varchar(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem8Opcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem8Opcion(
	idDeceDRCInformeSeguimientoItem8Opcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(50) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL	
)

INSERT  INTO dbo.DeceDRCInformeSeguimientoItem8Opcion(codigo,opcionTipo,atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
VALUES	(1,2, NULL,'acuerdosRepresentante', 'Acuerdos con representante', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2, NULL,'contencionEmocionalConsejeria', 'Contención emocional/consejeria', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2, NULL,'refuerzoPsicopedagogico', 'Refuerzo psicopedagógico', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2, NULL,'adaptacionCurricular', 'Adaptación curricular', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2, NULL,'resolucionConflictos', 'Resolución de conflictos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2, NULL,'reunionInterdiciplinaria', 'Reunión interdiciplinaria', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,2, NULL,'acuerdoEstudiante', 'Acuerdos con estudiantes', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(8,2, NULL,'seguimiento', 'Seguimiento', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(9,2, NULL,'acuerdoTutoresDocente', 'Acuerdos con tutores/docente', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(10,2,NULL, 'reunionAdministrativo', 'Reunión con administrativos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(11,2,NULL, 'comunicacionProfesionaleExterno', 'Comunicación con profesionales externos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(12,0,NULL, 'derivacionOtros', 'Derivación/Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem8') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem8(
	idDeceDRCInformeSeguimientoItem8 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCInformeSeguimientoItem8
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,idDeceDRCInformeSeguimientoItem8Opcion INT NOT NULL 
				CONSTRAINT FK_idDeceDRCInformeSeguimientoItem8Opcion_DeceDRCInformeSeguimientoItem8
				FOREIGN KEY (idDeceDRCInformeSeguimientoItem8Opcion) 
				REFERENCES dbo.DeceDRCInformeSeguimientoItem8Opcion(idDeceDRCInformeSeguimientoItem8Opcion)
,	descripcion VARCHAR(100) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCAcuerdosItem8') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCAcuerdosItem8(
	idDeceDRCAcuerdosItem8 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCAcuerdosItem8
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	descripcion varchar(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCObsSugerenciaItem9 ') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCObsSugerenciaItem9(
	idDeceDRCObsSugerenciaItem9 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCObsSugerenciaItem9
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	descripcion varchar(500) NOT NULL 
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDRCInformeSeguimientoItem10') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDRCInformeSeguimientoItem10(
	idDeceDRCInformeSeguimientoItem10 INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDeteccionRemisionCaso INT NOT NULL 
				CONSTRAINT FK_idDeceDeteccionRemisionCaso_DeceDRCInformeSeguimientoItem10
				FOREIGN KEY (idDeceDeteccionRemisionCaso) 
				REFERENCES dbo.DeceDeteccionRemisionCaso(idDeceDeteccionRemisionCaso)
,	descripcion varchar(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 3 Formulario FORMATO DERIVACION
	=============== *************************************************************************************************************************************
	===============
*/
IF OBJECT_ID('DeceDerivacionOpcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacionOpcion (
	idDeceDerivacionOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT INTO dbo.DeceDerivacionOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
VALUES	(1,1,'tipoDerivacion','interna','Interna', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,1,'tipoDerivacion','externa','Externa', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDerivacion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacion(
	idDeceDerivacion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDerivacionOpcion INT NOT NULL 
		CONSTRAINT FK_idDeceDerivacionOpcion_DeceDerivacion
		FOREIGN KEY (idDeceDerivacionOpcion)
		REFERENCES dbo.DeceDerivacionOpcion(idDeceDerivacionOpcion)
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	fechaNacimiento DATETIME NOT NULL
,	curso VARCHAR(100) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	nombreInstitucion VARCHAR(300) NOT NULL
,	direccionInstitucion VARCHAR(300) NOT NULL
,	contactoInstitucion VARCHAR(15) NOT NULL
,	nombreQuienDeriva VARCHAR(100) NOT NULL
,	contactoQuienDeriva VARCHAR(15) NOT NULL
,	cargoQuienDeriva VARCHAR(100) NOT NULL
,	fechaDerivacion DATETIME NOT NULL
,	fechaRegistro DATETIME NOT NULL 
)
END

ALTER TABLE DeceDerivacion
ADD idModalidad INT
ALTER TABLE DeceDerivacion
ADD modalidad VARCHAR(100)
ALTER TABLE DeceDerivacion
ADD idGrado  INT
ALTER TABLE DeceDerivacion
ADD codigoGrado	VARCHAR(50)
ALTER TABLE DeceDerivacion
ADD descripcionGrado VARCHAR(100)
ALTER TABLE DeceDerivacion
ADD idParalelo INT
ALTER TABLE DeceDerivacion
ADD paralelo VARCHAR(100)
ALTER TABLE DeceDerivacion
ADD idTurno INT
ALTER TABLE DeceDerivacion
ADD turno VARCHAR(100)

IF OBJECT_ID('DeceDerivacionInstitucionExternaOpcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacionInstitucionExternaOpcion (
	idDeceDerivacionInstitucionExternaOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(50) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT INTO dbo.DeceDerivacionInstitucionExternaOpcion (codigo, opcionTipo,atributoName, nombrePropiedad,descripcion, fechaRegistro, estado)
VALUES	(1,2,NULL,'unidadPoliciaNacional', 'Unidades especializadas de la policía nacional', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2,NULL,'juntaProteccionDerecho', 'Juntas de protección de derechos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2,NULL,'fiscalia', 'Fiscalía', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2,NULL,'unidadJudicial', 'Unidades judiciales', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2,NULL,'saludPublica', 'Establecimientos de salud públicos', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2,NULL,'saludPrivada', 'Establecimientos de salud privados', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,2,NULL,'ddEducacion', 'Dirección Distrital de Educación', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(8,2,NULL,'udai', 'UDAI', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(9,0,NULL,'otros', 'Otros', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceDerivacionInstitucionExterna') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacionInstitucionExterna (
	idDeceDerivacionInstitucionExterna INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDerivacion INT NOT NULL 
		CONSTRAINT FK_idDeceDerivacion_DeceDerivacionInstitucionExterna
		FOREIGN KEY (idDeceDerivacion)
		REFERENCES dbo.DeceDerivacion(idDeceDerivacion)
,	idDeceDerivacionInstitucionExternaOpcion INT NOT NULL 
		CONSTRAINT FK_idDeceDerivacionInstitucionExternaOpcion_DeceDerivacionInstitucionExterna
		FOREIGN KEY (idDeceDerivacionInstitucionExternaOpcion)
		REFERENCES dbo.DeceDerivacionInstitucionExternaOpcion(idDeceDerivacionInstitucionExternaOpcion)
,	descripcion VARCHAR(500) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDerivacionDatoPersonalDerivado') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacionDatoPersonalDerivado (
	idDeceDerivacionDatoPersonalDerivado INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDerivacion INT NOT NULL 
		CONSTRAINT FK_idDeceDerivacion_DeceDerivacionDatoPersonalDerivado
		FOREIGN KEY (idDeceDerivacion)
		REFERENCES dbo.DeceDerivacion(idDeceDerivacion)
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	idGenero INT NOT NULL 
		CONSTRAINT FK_idGenero_DeceDerivacionDatoPersonalDerivado
		FOREIGN KEY (idGenero)
		REFERENCES dbo.Genero(codGenero)
,	edad INT NOT NULL
,	fechaNacimiento DATETIME NOT NULL
,	curso VARCHAR(100) NOT NULL
,	direccionDomiciliaria VARCHAR(500) NOT NULL
,	nombrePadre VARCHAR(100) NOT NULL
,	numeroTelefonico varchar(20) NOT NULL 
,	nombreMadre VARCHAR(100) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceDerivacionValoracionCaso') IS NULL
	BEGIN
CREATE TABLE dbo.DeceDerivacionValoracionCaso (
	idDeceDerivacionValoracionCaso INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceDerivacion INT NOT NULL 
		CONSTRAINT FK_idDeceDerivacion_DeceDerivacionValoracionCaso
		FOREIGN KEY (idDeceDerivacion)
		REFERENCES dbo.DeceDerivacion(idDeceDerivacion)
,	motivoReferencia VARCHAR(1000) NOT NULL
,	descripcionProblematica VARCHAR(1000) NOT NULL
,	accionDesarrollada VARCHAR(1000) NOT NULL
,	observaciones VARCHAR(1000) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END


/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 4 Formulario TIPO DE INTERVENCION
	=============== *************************************************************************************************************************************
	===============
*/
/* Tabla dbo.DeceIntervencionSesionSeguimientoOpcion usada para 2 formularios */
IF OBJECT_ID('DeceIntervencionSesionSeguimientoOpcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionSesionSeguimientoOpcion (
	idDeceIntervencionSesionSeguimientoOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(50) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT INTO dbo.DeceIntervencionSesionSeguimientoOpcion(codigo, opcionTipo,atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
values	(1, 1,'tipoIntervencionSesionSeguimiento','individual','Individual', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2, 1,'tipoIntervencionSesionSeguimiento','familiar','Familiar', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3, 1,'tipoIntervencionSesionSeguimiento','grupalComunitario','Grupal/Comunitario', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4, 1,'tipoIntervencionSesionSeguimiento','institucional','Institucional', dbo.F_ObtieneFechaHoraActualEcuador(), 1)

END


--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idSucursal INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD gestion	 INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idUsuario  INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idRol INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD nombreRol	VARCHAR(50)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idModalidad INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idGrado  INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idParalelo INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD idTurno INT
--ALTER TABLE DeceDerivacionDatoPersonalDerivado
--ADD turno VARCHAR(100)


--ALTER TABLE DeceIntervencion
--ADD codAlumno INT
--ALTER TABLE DeceIntervencion
--ADD nombreAlumno VARCHAR(500)
--ALTER TABLE DeceIntervencion
--ADD idSucursal INT
--ALTER TABLE DeceIntervencion
--ADD gestion	 INT
--ALTER TABLE DeceIntervencion
--ADD idUsuario  INT
--ALTER TABLE DeceIntervencion
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceIntervencion
--ADD idRol INT
--ALTER TABLE DeceIntervencion
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceIntervencion
--ADD idModalidad INT
--ALTER TABLE DeceIntervencion
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceIntervencion
--ADD idGrado  INT
--ALTER TABLE DeceIntervencion
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceIntervencion
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceIntervencion
--ADD idParalelo INT
--ALTER TABLE DeceIntervencion
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceIntervencion
--ADD idTurno INT
--ALTER TABLE DeceIntervencion
--ADD turno VARCHAR(100)

IF OBJECT_ID('DeceIntervencion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencion(
	idDeceIntervencion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencionSesionSeguimientoOpcion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencionSesionSeguimientoOpcion_DeceIntervencion
		FOREIGN KEY  (idDeceIntervencionSesionSeguimientoOpcion)
		REFERENCES dbo.DeceIntervencionSesionSeguimientoOpcion(idDeceIntervencionSesionSeguimientoOpcion)
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionDestinatario') IS NULL
	BEGIN
CREATE TABLE DeceIntervencionDestinatario(
	idDeceIntervencionDestinatario	INT NOT NULL  PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_DeceIntervencionDestinatario
		FOREIGN KEY  (idDeceIntervencion)
		REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	destinatario varchar(100) not null
,	fechaRegistro datetime Not null
)
END
IF OBJECT_ID('DeceIntervencionRiesgoIdentificado') IS NULL
	BEGIN
CREATE TABLE DeceIntervencionRiesgoIdentificado(
	idDeceIntervencionRiesgoIdentificado INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_DeceIntervencionRiesgoIdentificado
		FOREIGN KEY  (idDeceIntervencion)
		REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	descripcion VARCHAR(300) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionAreaOpcion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionAreaOpcion(
	idDeceIntervencionAreaOpcion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo INT NOT NULL UNIQUE
,	opcionTipo INT NOT NULL /*0 => Textarea/Input 1 => Radio 2 => CheckBox, 3 => Radio y Textarea/Imput 4 => CheckBox y Textarea/Input*/
,	atributoName VARCHAR(50) NULL
,	nombrePropiedad VARCHAR(50) NOT NULL
,	descripcion VARCHAR(50) NOT NULL
,	fechaRegistro DATETIME NOT NULL
,	estado BIT NOT NULL
)

INSERT INTO dbo.DeceIntervencionAreaOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado)
values	(1,2, NULL, 'cognitivo', 'Cognitivo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(2,2, NULL, 'conductual', 'Conductual', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(3,2, NULL, 'academico', 'Academico', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(4,2, NULL, 'afectivo', 'Afectivo', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(5,2, NULL, 'motriz', 'Motriz', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(6,2, NULL, 'sensorial', 'Sensorial', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
,		(7,0, NULL, 'otra', 'Otra', dbo.F_ObtieneFechaHoraActualEcuador(), 1)
END
IF OBJECT_ID('DeceIntervencionArea') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionArea(
	idDeceIntervencionArea INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
	CONSTRAINT FK_idDeceIntervencion_DeceIntervencionArea
	FOREIGN KEY  (idDeceIntervencion)
	REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	idDeceIntervencionAreaOpcion INT NOT NULL
	CONSTRAINT FK_idDeceIntervencionAreaOpcion_DeceIntervencionArea
	FOREIGN KEY  (idDeceIntervencionAreaOpcion)
	REFERENCES dbo.DeceIntervencionAreaOpcion(idDeceIntervencionAreaOpcion)
,	descripcion varchar(100) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionObjetivoGeneral') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionObjetivoGeneral(
	idDeceIntervencionObjetivoGeneral INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_DeceIntervencionObjetivoGeneral
		FOREIGN KEY  (idDeceIntervencion)
		REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	descripcion VARCHAR(500) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionObjetivoEspecifico') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionObjetivoEspecifico(	
	idDeceIntervencionObjetivoEspecifico INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencionObjetivoGeneral INT NOT NULL
		CONSTRAINT FK_idDeceIntervencionObjetivoGeneral_DeceIntervencionObjetivoEspecifico
		FOREIGN KEY  (idDeceIntervencionObjetivoGeneral)
		REFERENCES dbo.DeceIntervencionObjetivoGeneral(idDeceIntervencionObjetivoGeneral)
,	objEspecifico VARCHAR(300) NOT NULL
,	objEspecifico2 VARCHAR(300) NULL
,	objEspecifico3 VARCHAR(300) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionAccionEstrategia') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionAccionEstrategia(
	idDeceIntervencionAccionEstrategia INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencionObjetivoEspecifico INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_idDeceIntervencionAccionEstrategia
		FOREIGN KEY  (idDeceIntervencionObjetivoEspecifico)
		REFERENCES dbo.DeceIntervencionObjetivoEspecifico(idDeceIntervencionObjetivoEspecifico)
,	acciones VARCHAR(100) NULL
,	responsable VARCHAR(100) NULL
,	acciones2 VARCHAR(100) NULL
,	responsable2 VARCHAR(100) NULL
,	acciones3 VARCHAR(100) NULL
,	responsable3 VARCHAR(100) NULL
,	acciones4 VARCHAR(100) NULL
,	responsable4 VARCHAR(100) NULL
,	acciones5 VARCHAR(100) NULL
,	responsable5 VARCHAR(100) NULL
,	acciones6 VARCHAR(100) NULL
,	responsable6 VARCHAR(100) NULL
,	acciones7 VARCHAR(100) NULL
,	responsable7 VARCHAR(100) NULL
,	acciones8 VARCHAR(100) NULL
,	responsable8 VARCHAR(100) NULL
,	acciones9 VARCHAR(100) NULL
,	responsable9 VARCHAR(100) NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionResultadoObtenido') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionResultadoObtenido(
	idDeceIntervencionResultadoObtenido INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_DeceIntervencionResultadoObtenido
		FOREIGN KEY  (idDeceIntervencion)
		REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	descripcion VARCHAR(300) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceIntervencionObsRecomendacion') IS NULL
	BEGIN
CREATE TABLE dbo.DeceIntervencionObsRecomendacion(
	idDeceIntervencionObsRecomendacion INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencion_DeceIntervencionObsRecomendacion
		FOREIGN KEY  (idDeceIntervencion)
		REFERENCES dbo.DeceIntervencion(idDeceIntervencion)
,	descripcion VARCHAR(300) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
/*WITHOUT_ARRAY_WRAPPER
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 5 Formulario PROCESO DE SESION Y SEGUIMIENTO
	=============== *************************************************************************************************************************************
	===============
*/

IF OBJECT_ID('DeceSesionSeguimiento') IS NULL
	BEGIN
CREATE TABLE dbo.DeceSesionSeguimiento (
	idDeceSesionSeguimiento INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceIntervencionSesionSeguimientoOpcion INT NOT NULL
		CONSTRAINT FK_idDeceIntervencionSesionSeguimientoOpcion_DeceSesionSeguimiento
		FOREIGN KEY  (idDeceIntervencionSesionSeguimientoOpcion)
		REFERENCES dbo.DeceIntervencionSesionSeguimientoOpcion(idDeceIntervencionSesionSeguimientoOpcion)
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	curso varchar(100) NOT NULL
,	dificultadDetectada varchar(100) NOT NULL
,	nombreProfesional varchar(254) NOT NULL
,	fechaInicioIntervencion DATETIME NOT NULL
,	fechaRegistro datetime NOT NULL
)
END
IF OBJECT_ID('DeceSesionSeguimientoDetalle') IS NULL
	BEGIN
CREATE  TABLE dbo.DeceSesionSeguimientoDetalle (
	idDeceSesionSeguimientoDetalle INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceSesionSeguimiento INT NOT NULL
		CONSTRAINT FK_idDeceSesionSeguimiento_DeceSesionSeguimientoDetalle
		FOREIGN KEY  (idDeceSesionSeguimiento)
		REFERENCES dbo.DeceSesionSeguimiento(idDeceSesionSeguimiento)
,	fecha datetime NOT NULL
,	areasTrabajadas varchar(300) NOT NULL
,	actividadesPlanificadas varchar(300) NOT NULL
,	materialesUtilizar varchar(300) NOT NULL
,	observaciones varchar(300) NOT NULL
,	avances varchar(300) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 6 Formulario ATENCION A REPRESENTANTES
	=============== *************************************************************************************************************************************
	===============
*/

IF OBJECT_ID('DeceAtencionRepresentante') IS NULL
	BEGIN
CREATE TABLE dbo.DeceAtencionRepresentante(
	idDeceAtencionRepresentante INT  NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo VARCHAR(50) NOT NULL UNIQUE
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	fechaAtencion datetime NOT NULL
,	medioAtencion varchar(100) NOT NULL
,	curso varchar(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	representante varchar(100) NOT NULL
,	asunto varchar(100) NOT NULL
,	actividadRealizada varchar(100) NOT NULL
,	acuerdosCompromisos varchar(300) NOT NULL
,	evidencia varchar(300) NOT NULL
,	fechaRegistro datetime NOT NULL
)
END
/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 7 Formulario ATENCION A ESTUDIANTES
	=============== *************************************************************************************************************************************
	===============
*/

IF OBJECT_ID('DeceAtencionAlumno') IS NULL
	BEGIN
CREATE TABLE dbo.DeceAtencionAlumno(
	idDeceAtencionAlumno INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo VARCHAR(50) NOT NULL UNIQUE
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	fechaAtencion datetime NOT NULL
,	medioAtencion varchar(100) NOT NULL
,	curso varchar(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	asunto varchar(100) NOT NULL
,	actividadRealizada varchar(100) NOT NULL
,	acuerdosCompromisos varchar(300) NOT NULL
,	evidencia varchar(300) NOT NULL
,	fechaRegistro datetime NOT NULL
)
END
/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 8 Formulario SEGUIMIENTO DE CASO INDIVIDUAL
	=============== *************************************************************************************************************************************
	===============
*/

--ALTER TABLE DeceSesionSeguimiento
--ADD idSucursal INT
--ALTER TABLE DeceSesionSeguimiento
--ADD gestion	 INT
--ALTER TABLE DeceSesionSeguimiento
--ADD idUsuario  INT
--ALTER TABLE DeceSesionSeguimiento
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceSesionSeguimiento
--ADD idRol INT
--ALTER TABLE DeceSesionSeguimiento
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceSesionSeguimiento
--ADD idModalidad INT
--ALTER TABLE DeceSesionSeguimiento
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceSesionSeguimiento
--ADD idGrado  INT
--ALTER TABLE DeceSesionSeguimiento
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceSesionSeguimiento
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceSesionSeguimiento
--ADD idParalelo INT
--ALTER TABLE DeceSesionSeguimiento
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceSesionSeguimiento
--ADD idTurno INT
--ALTER TABLE DeceSesionSeguimiento
--ADD turno VARCHAR(100)
--ALTER TABLE DeceAtencionRepresentante
--ADD idSucursal INT
--ALTER TABLE DeceAtencionRepresentante
--ADD gestion	 INT
--ALTER TABLE DeceAtencionRepresentante
--ADD idUsuario  INT
--ALTER TABLE DeceAtencionRepresentante
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceAtencionRepresentante
--ADD idRol INT
--ALTER TABLE DeceAtencionRepresentante
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceAtencionRepresentante
--ADD idModalidad INT
--ALTER TABLE DeceAtencionRepresentante
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceAtencionRepresentante
--ADD idGrado  INT
--ALTER TABLE DeceAtencionRepresentante
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceAtencionRepresentante
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceAtencionRepresentante
--ADD idParalelo INT
--ALTER TABLE DeceAtencionRepresentante
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceAtencionRepresentante
--ADD idTurno INT
--ALTER TABLE DeceAtencionRepresentante
--ADD turno VARCHAR(100)
--ALTER TABLE DeceAtencionAlumno
--ADD idSucursal INT
--ALTER TABLE DeceAtencionAlumno
--ADD gestion	 INT
--ALTER TABLE DeceAtencionAlumno
--ADD idUsuario  INT
--ALTER TABLE DeceAtencionAlumno
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceAtencionAlumno
--ADD idRol INT
--ALTER TABLE DeceAtencionAlumno
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceAtencionAlumno
--ADD idModalidad INT
--ALTER TABLE DeceAtencionAlumno
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceAtencionAlumno
--ADD idGrado  INT
--ALTER TABLE DeceAtencionAlumno
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceAtencionAlumno
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceAtencionAlumno
--ADD idParalelo INT
--ALTER TABLE DeceAtencionAlumno
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceAtencionAlumno
--ADD idTurno INT
--ALTER TABLE DeceAtencionAlumno
--ADD turno VARCHAR(100) 
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idSucursal INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD gestion	 INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idUsuario  INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idRol INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idModalidad INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idGrado  INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idParalelo INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD idTurno INT
--ALTER TABLE DeceSeguimientoCasoIndividual
--ADD turno VARCHAR(100) 

--ALTER TABLE DeceCompromisoRepresentante
--ADD idSucursal INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD gestion	 INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD idUsuario  INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD nombreUsuario	VARCHAR(50)
--ALTER TABLE DeceCompromisoRepresentante
--ADD idRol INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD nombreRol	VARCHAR(50)

--ALTER TABLE DeceCompromisoRepresentante
--ADD idModalidad INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD modalidad VARCHAR(100)
--ALTER TABLE DeceCompromisoRepresentante
--ADD idGrado  INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD codigoGrado	VARCHAR(50)
--ALTER TABLE DeceCompromisoRepresentante
--ADD descripcionGrado VARCHAR(100)
--ALTER TABLE DeceCompromisoRepresentante
--ADD idParalelo INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD paralelo VARCHAR(100)
--ALTER TABLE DeceCompromisoRepresentante
--ADD idTurno INT
--ALTER TABLE DeceCompromisoRepresentante
--ADD turno VARCHAR(100) 
IF OBJECT_ID('DeceSeguimientoCasoIndividual') IS NULL
	BEGIN
CREATE TABLE dbo.DeceSeguimientoCasoIndividual(
	idDeceSeguimientoCasoIndividual INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500)NOT NULL
,	fechaNacimiento datetime NOT NULL
,	curso varchar(100) NOT NULL
,	fechaAperturaSeguimiento datetime NOT NULL
,	nombreRemitente varchar(100) NOT NULL
,	nombreInstitucion varchar(100) NOT NULL
,	accionesRealizadas varchar(1000) NOT NULL
,	acuerdos varchar(1000) NOT NULL 
,	recomendacionesSugerencias varchar(1000) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END

/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 9 Formulario FORMATO DE COMPROMISO
	=============== *************************************************************************************************************************************
	===============
*/


IF OBJECT_ID('DeceCompromisoRepresentante') IS NULL
	BEGIN
CREATE TABLE dbo.DeceCompromisoRepresentante(
	idDeceCompromisoRepresentante INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codigo VARCHAR(50) NOT NULL UNIQUE
,   idSucursal INT NOT NULL
,   gestion	 INT NOT NULL
,   idUsuario  INT NOT NULL
,   nombreUsuario	VARCHAR(50) NOT NULL
,   idRol INT NOT NULL
,   nombreRol	VARCHAR(50) NOT NULL
,   idModalidad INT NOT NULL
,   modalidad VARCHAR(100) NOT NULL
,   idGrado  INT NOT NULL
,   codigoGrado	VARCHAR(50) NOT NULL
,   descripcionGrado VARCHAR(100) NOT NULL
,   idParalelo INT NOT NULL
,   paralelo VARCHAR(100) NOT NULL
,   idTurno INT NOT NULL
,   turno VARCHAR(100) NOT NULL
,	fechaCompromiso date NOT NULL
,	nombreRepresentante varchar(100) NOT NULL
,	cedulaRepresentante varchar(20) NOT NULL
,	codAlumno INT NOT NULL
,	nombreAlumno VARCHAR(500) NOT NULL
,	curso varchar(100) NOT NULL
,	docente varchar(100) NOT NULL
,	fechaRegistro DATETIME NOT NULL
)
END
IF OBJECT_ID('DeceCompromisoRepresentanteDetalle') IS NULL
	BEGIN
CREATE TABLE dbo.DeceCompromisoRepresentanteDetalle(
	idDeceCompromisoRepresentanteDetalle INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idDeceCompromisoRepresentante INT NOT NULL
		CONSTRAINT FK_idDeceCompromisoRepresentante_DeceCompromisoRepresentanteDetalle
		FOREIGN KEY  (idDeceCompromisoRepresentante)
		REFERENCES dbo.DeceCompromisoRepresentante(idDeceCompromisoRepresentante)
,	descripcion varchar(300) NOT NULL
,	fechaRegistro DATETIME NOT NULL

)
END
--===============================================================================================================================================
--===============================================================================================================================================
--===============================================================================================================================================
IF OBJECT_ID('ErroresSP') IS NULL
	BEGIN
CREATE TABLE [dbo].[ErroresSP](
	[IdError] [int] IDENTITY(1,1) NOT NULL,
	[Identificador] [uniqueidentifier] NOT NULL,
	[NombreObjeto] [nvarchar](100) NULL,
	[ErrorNumber] [int] NOT NULL,
	[ErrorSeverity] [nvarchar](200) NOT NULL,
	[ErrorState] [int] NOT NULL,
	[ErrorProcedure] [nvarchar](200) NOT NULL,
	[ErrorLine] [int] NOT NULL,
	[ErrorMessage] [nvarchar](200) NOT NULL,
	[ErrorDateTime] [datetime] NOT NULL,
	[idSucursal] [int] NULL,
	[idUsuario] [int] NULL,
	[idRol] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdError] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END




--**********************************************************************************************************************************************************************************
--**********************************************************************************************************************************************************************************
IF OBJECT_ID('Usuario') IS NULL
	BEGIN
CREATE TABLE dbo.Usuario(
	idUsuario INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	codUsuario  VARCHAR(50) NOT NULL 
		CONSTRAINT U_codUsuario_Usuario UNIQUE(codUsuario)
,	contrasena nvarchar(max) NOT NULL
,	nombreCompleto VARCHAR(150) NOT NULL
,	email varchar(100) NOT NULL
,	celular varchar(10) NOT NULL
,	estado BIT NOT NULL
,	fechaBaja DATETIME NULL
,	fechaRegistro DATETIME NOT NULL
,	urlImg varchar(max) NULL
)
	DECLARE 
	@clave NVARCHAR(max) = (LOWER(CONVERT(NVARCHAR(32),HASHBYTES('MD5', LTRIM(RTRIM(CONVERT(VARCHAR,'.1234*')))),2))) --MD5

	INSERT INTO dbo.Usuario
	VALUES ('JsonMC', @clave, 'Jefferson Mena', 'jefferson.mena@adventistas.org', '0982368622',1, NULL, GETDATE(), NULL)
END
IF OBJECT_ID('Rol') IS NULL
	BEGIN
		CREATE TABLE dbo.Rol(
			idRol INT NOT NULL PRIMARY KEY IDENTITY(1,1)
		,	descripcion VARCHAR(300) NOT NULL 
		,	estado BIT NOT NULL
		)
	
INSERT INTO dbo.Rol(descripcion,estado)
values	('ADMIN', 1)
,		('ACADEMICA',1)
,		('COORDINADOR DECE',1)
,		('DECE',1 )
END
IF OBJECT_ID('Menu') IS NULL
	BEGIN
CREATE TABLE dbo.Menu(
	idMenu INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	descripcion varchar(100) not null
,	url VARCHAR(50) not NULL
,	icon VARCHAR(50) NULL 

)
INSERT INTO dbo.Menu(icon,url, descripcion)
values	(NULL, 'TableListar', '')
,		(NULL, 'TableDeteccionRemisionCaso', '')
,		(NULL, 'TableDerivacion', '')
,		(NULL, 'TableTipoIntervencion', '')
,		(NULL, 'TableSesionSeguimiento', '')
,		(NULL, 'TableAtencionEstudiante', '')
,		(NULL, 'TableAtencionRepresentante', '')
,		(NULL, 'TableCasoIndividual', '')
,		(NULL, 'TableCompromiso', '')
END
IF OBJECT_ID('SubMenu') IS NULL
	BEGIN
CREATE TABLE dbo.SubMenu(
	idSubMenu INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idMenu INT NOT NULL
		CONSTRAINT FK_idMenu_SubMenu
		FOREIGN KEY  (idMenu)
		REFERENCES dbo.Menu(idMenu)
,	icon VARCHAR(50) NULL 
,	url VARCHAR(50) NOT NULL
)
END

-------------------------------------------------------------------------------------------------------------------------------------------

IF OBJECT_ID('Sucursal') IS NULL
	BEGIN
CREATE TABLE [dbo].[Sucursal](
	[idSucursal] [int] IDENTITY(1,1) NOT NULL,
	[codSucursal] [int] NULL,
	[codEntidad] [int] NULL,
	[nombre] [nvarchar](100) NULL,
	[ruc] [varchar](13) NULL,
	[direccion] [nvarchar](200) NULL,
	[ciudad] [nvarchar](50) NULL,
	[nombreLegal] [nvarchar](100) NULL,
	[estado] [bit] NULL,
	[orden] [int] NULL,
	[region] [int] NULL,
	[telefono] [nvarchar](50) NULL,
	[telefonoCel] [nvarchar](10) NULL,
	[provincia] [nvarchar](50) NULL,
	[email] [nvarchar](100) NULL,
	[telefonoAdicional] [nvarchar](10) NULL,
	[abreviatura] [nvarchar](10) NULL,
 CONSTRAINT [PK__Sucursal__BFB6CD990296A994] PRIMARY KEY CLUSTERED 
(
	[idSucursal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

SET IDENTITY_INSERT [dbo].[Sucursal] ON 

INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1021, 16, 18, N'Unidad Educativa Particular Adventista del Ecuador', N'1790127613001', N'Sto. Domingo - Vía Quevedo Km. 14 1/2', N'Santo Domingo', N'CADE', 1, 1, 2, N'593-990399025', N'0990399025', N'Santo Domingo de los Tsachilas', N'secretaria.academica@cade.edu.ec', NULL, N'CADE')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1022, 1, 1, N'Unión Ecuatoriana', N'1790127613001', N'Mariano Paredes N72-49 y Rodrigo de Villalobos', N'Quito', N'', 1, 1, 0, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1025, 7, 12, N'Unidad Educativa Particular Adventista Ciudad de Quito', N'1790127613001', N'Santa Lucía E7-143 y Av. 6 de Diciembre', N'Quito', N'COLEGIO ADVENTISTA CIUDAD DE QUITO', 1, 1, 1, N'2805-419', N'', N'Pichincha', N'colegio.ciudaddequito@educacionadventista.ec', N'', N'UEPA-CQ')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1026, 9, 12, N'Unidad Educativa Adventista Gedeón', N'1790127613001', N'Charles Darwin Lote 244 y Vicente Solano', N'Quito', N'COLEGIO ADVENTISTA GEDEON', 1, 2, 1, N'2078065', N'', N'Pichincha', N'', N'', N'UEPA-G')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1027, 12, 12, N'Unidad Educativa Particular Adventista del Sur', N'1790127613001', N'Anconcito Lote 61 y Tabiazo', N'Quito', N'COLEGIO ADVENTISTA DEL SUR', 1, 3, 1, N'3026418', N'0986889725', N'Pichincha', N'colegio.adventistadelsur@educacionadventista.ec', N'3026818', N'UEPA-S')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1028, 21, 15, N'Escuela Adventista Miguel de Cervantes', N'1790127613001', N'Cooperativa Los Vergeles Mz 38 A, Solar 01-02', N'Guayaquil', N'MIGUEL DE CERVANTES', 1, 3, 2, N'042019117', N'0991887614', N'Guayas', N'escuela.migueldecervantes@educacionadventista.ec', N'', N'EAMC')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1029, 22, 15, N'Unidad Educativa Adventista Loma Linda', N'1790127613001', N'Av. Charles Darwin S/N y 12 de Febrero', N'Puerto Ayora', N'LOMA LINDA', 1, 8, 2, N'2526638', N'2526638', N'Galápagos', N'colegio.lomalinda@educacionadventista.ec', N'', N'UELL')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1030, 23, 15, N'Unidad Educativa Adventista del Pacifico', N'1790127613001', N'6 de Marzo y Colombia', N'Guayaquil', N'PACIFICO', 1, 2, 2, N'046053000', N'', N'Guayas', N'ruth.noboa@educacionadventista.ec', N'', N'UEAP')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1031, 26, 15, N'Escuela Adventista Luz de Oriente', N'1790127613001', N'Calle 38a° y Oriente', N'Guayaquil', N'', 0, 4, 2, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1032, 28, 15, N'Escuela Adventista Lirio de los Valles', N'1790127613001', N'Recinto El Achiote, Vía Mata de Cacao - Parroquia Febres Cordero', N'Mata de Cacao', N'LIRIO DE LOS VALLES', 1, 1, 2, N'0991753516', N'', N'Babahoyo', N'colegio.liriodelosvalles@educacionadventista.ec', N'', N'EALV')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1033, 30, 15, N'Unidad Educativa Particular Adventista "Príncipe de Paz"', N'1790127613001', N'Avda. La República y Marta Bucaram ', N'Huaquillas', N'PRINCIPE DE PAZ', 1, 7, 2, N'0991780439', N'', N'El Oro', N'principedepaz@educacionadventista.ec', N'', N'UEPAPP')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1034, 31, 12, N'Unidad Educativa Particular Adventista Emanuel', N'1790127613001', N'Vía Quito km 2', N'Lago Agrio', N'COLEGIO EMANUEL', 1, 5, 1, N'062362497', N'', N'Sucumbios', N'', N'', N'UEPA-E')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1035, 33, 12, N'Unidad Educativa Adventista Ambato', N'1790127613001', N'18021', N'Ambato', N'COLEGIO ADVENTISTA AMBATO', 1, 4, 1, N'2436827 ', N'0983617464', N'Tungurahua', N'adventistaecam@hotmail.com', N'', N'UEPA-A')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1036, 34, 12, N'Unidad Educativa Adventista Miguel de Unamuno', N'1790127613001', N'Colón 1407 y Salinas', N'Esmeraldas', N'COLEGIO ADVENTISTA EMANUEL', 1, 7, 2, N'062452272', N'', N'Esmeraldas', N'', N'', N'UEPA-MU')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1037, 35, 12, N'Unidad Educativa Particular "Adventista Santo Domingo"', N'1790127613001', N'Av. Italia y vía Chone Km. 4 ½ Entrada a la UTE   Urb. Buenos Aires', N'Santo Domingo', N'COLEGIO ADVENTISTA SANTO DOMINGO', 1, 6, 2, N'3767514', N'0997441552', N'Santo Domingo de los Tsáchilas', N'colegio.santodomingo@educacionadventista.ec', N'', N'UEPA-SD')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1038, 40, 15, N'Escuela Adventista Roca de los Siglos', N'1790127613001', N'Barrio Kennedy, Diagonal B entre calle 16 y 17', N'Guayaquil', N'', 0, 5, 2, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1039, 45, 15, N'Escuela Adventista de Manta', N'1790127613001', N'Barrio Santa Cecilia, calle Portoviejo, Vía Manta-Jaramijó', N'Manta', N'', 0, 6, 2, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1040, 47, 12, N'Sistema Educativo - MEN', N'1790127613001', N'Av. Atahualpa OE 3-92 y Ulloa', N'Quito', N'', 1, 8, 1, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1041, 48, 15, N'Sistema Educativo - MES', N'1790127613001', N'Tulcán 901 y Hurtado', N'Guayaquil', N'', 1, 9, 2, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (1044, 65, 19, N'ITSAE', N'1790127613001', N'Km 14.5 Via Quevedo', N'Santo Domingo', N'Instituto Tecnológico Superior Adventista del Ecuador', 0, 1, 2, N'-', NULL, N'', N'', NULL, N'')
INSERT [dbo].[Sucursal] ([idSucursal], [codSucursal], [codEntidad], [nombre], [ruc], [direccion], [ciudad], [nombreLegal], [estado], [orden], [region], [telefono], [telefonoCel], [provincia], [email], [telefonoAdicional], [abreviatura]) VALUES (2049, 1, 20, N'Colegio de pruebas', N'1790127613001', N'aqui estoy vivo', N'Prueba', N'Colegio de pruebas', 1, 1, 2, N'', N'', N'Prueba', N'ivan.paz@itsae.edu.ec', N'', N'TEST')
SET IDENTITY_INSERT [dbo].[Sucursal] OFF
END

------------------------------------------------------------------------------------------------------------
--INSERT INTO dbo.SubMenu([idMenu],[icon],[url])
--values	(1,NULL, '/DatosIdentificacion/:id')
--,		(1,NULL, '/DatosFamiliares/:id')
--,		(1,NULL, '/ReferenciaFamiliarEconomica/:id')
--,		(1,NULL, '/ReferenciaSocioeconomica/:id')
--,		(1,NULL, '/PeriodoPrenatalHistoriaVital/:id')
--,		(1,NULL, '/DatosSalud/:id')
--,		(1,NULL, '/HistoriaEduccional/:id')

--,		(2,NULL, '/IdentificacionEstudiante/:id')
--,		(2,NULL, '/MotivoReporte/:id')
--,		(2,NULL, '/DescripcionCaso/:id')
--,		(2,NULL, '/SeguimientoDocente/:id')
--,		(2,NULL, '/SeguimientoTutorInspector/:id')
--,		(2,NULL, '/AccionesTutorInspector/:id')
--,		(2,NULL, '/SeguimientoCapellania/:id')
--,		(2,NULL, '/SeguimientoDece/:id')
--,		(2,NULL, '/ObservacionesSugerencias/:id')
--,		(2,NULL, '/InformeSeguimiento/:id')

--,		(3,NULL, '/TipoDerivacion/:id')
--,		(3,NULL, '/DerivacionInstitucionExterna/:id')
--,		(3,NULL, '/DerivacionDatosPersonales/:id')
--,		(3,NULL, '/DerivacionValoracionCaso/:id')

--,		(4,NULL, '/TipoIntervencion/:id')
--,		(4,NULL, '/GeneralEspecifico/:id')
--,		(4,NULL, '/ResultadosObservaciones/:id')

--,		(5,NULL, '/ProcesoSesionSeguimiento/:id')
--,		(5,NULL, '/RegistroSesionSeguimiento/:id')

--,		(6,NULL, '/AtencionEstudiante/:id')

--,		(7,NULL, '/AtencionPadre/:id')

--,		(8,NULL, '/CasoIndividual/:id')

--,		(9,NULL, '/CompromisoPadres/:id')

IF OBJECT_ID('MenuAcceso') IS NULL
	BEGIN
	CREATE TABLE dbo.MenuAcceso(
		idMenuAcceso INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	idRol INT NOT NULL
			CONSTRAINT FK_idRol_MenuAcceso
			FOREIGN KEY  (idRol)
			REFERENCES dbo.Rol(idRol)
	,	idMenu INT NOT NULL
			CONSTRAINT FK_idMenu_MenuAcceso
			FOREIGN KEY  (idMenu)
			REFERENCES dbo.Menu(idMenu)
	,	orden INT NOT NULL
	,	fechaRegistro DATETIME NOT NULL
	)

	INSERT INTO dbo.MenuAcceso	
	SELECT r.idRol, m.idMenu, ROW_NUMBER() over(order by m.idMenu asc) orden, getdate() fechaRegistro
	FROM dbo.Rol r
	INNER JOIN dbo.Menu m ON r.estado = 1
END
IF OBJECT_ID('Acceso') IS NULL
	BEGIN
CREATE TABLE dbo.Acceso(
	idAcceso INT NOT NULL PRIMARY KEY IDENTITY(1,1)
,	idUsuario INT NOT NULL
		CONSTRAINT FK_idUsuario_Acceso
		FOREIGN KEY  (idUsuario)
		REFERENCES dbo.Usuario(idUsuario)
,	idRol INT NOT NULL
		CONSTRAINT FK_idRol_Acceso
		FOREIGN KEY  (idRol)
		REFERENCES dbo.Rol(idRol)
,	idSucursal INT NOT NULL
		CONSTRAINT FK_idSucursal_Acceso
		FOREIGN KEY  (idSucursal)
		REFERENCES dbo.Sucursal(idSucursal)
,	predeterminado BIT NOT NULL
,	fechaBaja DATETIME NULL
,	fechaRegistro DATETIME NOT NULL
)
	
	INSERT INTO dbo.Acceso
	SELECT u.idUsuario, r.idRol, s.idSucursal , CASE WHEN s.idSucursal = 1025 THEN 1 ELSE 0 END, null, GETDATE()
	FROM Usuario u
	INNER JOIN dbo.Rol r ON r.descripcion = 'ADMIN'
	INNER JOIN dbo.Sucursal s ON s.estado = r.estado
END

------------------------------------------------------------------------------------------------------------------------------------------------

IF OBJECT_ID('RecuperaActiva') IS NULL
	BEGIN
CREATE TABLE RecuperaActiva (
		idRecuperaActiva INT NOT NULL PRIMARY KEY IDENTITY(1,1)
	,	tipo INT NOT NULL /* 1- ACTIVAR 2- recuperar usuario/clave */
	,	codigo VARCHAR(8) NOT NULL
	,	email VARCHAR(100) NULL
	,	celular VARCHAR(10) NULL
	,	fechaRegistro DATETIME NOT NULL
	,	tiempoVida DATETIME NOT NULL
	/* IP SOLICITANTE, COORDENADAS DE IP*/
	)
	END
	