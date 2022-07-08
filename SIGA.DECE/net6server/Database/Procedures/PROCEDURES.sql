/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 3 Formulario FORMATO DERIVACION
	=============== *************************************************************************************************************************************
	===============
*/
GO
IF OBJECT_ID('uspDeceDerivacionOpcionInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionOpcionInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionOpcionInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionOpcionInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceDerivacionOpcion([codigo], [opcionTipo], [nombrePropiedad], [atributoName], [descripcion], [fechaRegistro], [estado])
		SELECT di.codigo, di.opcionTipo, di.nombrePropiedad, di.atributoName, di.descripcion, @fechaHoy, 1
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo			INT	'$.codigo'
		,	opcionTipo		INT	'$.opcionTipo'
		,	nombrePropiedad VARCHAR(50) '$.nombrePropiedad'
		,	atributoName VARCHAR(50) '$.atributoName'
		,	descripcion		VARCHAR(500) '$.descripcion'
		)	AS di
		
		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceDerivacionOpcion dop WHERE dop.idDeceDerivacionOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
---========================================================================================================

GO
IF OBJECT_ID('uspDeceDerivacionOpcionUpdate') IS NOT NULL 
	DROP PROC uspDeceDerivacionOpcionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionOpcionUpdate 0, 0, 0, 0
CREATE PROC uspDeceDerivacionOpcionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''


BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		UPDATE ddo
		
		SET	ddo.codigo = dj.codigo
		,	ddo.opcionTipo = dj.opcionTipo
		,	ddo.nombrePropiedad = dj.nombrePropiedad
		,	ddo.atributoName = dj.atributoName
		,	ddo.descripcion = dj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
		idDeceDerivacionOpcion	INT	'$.idDeceDerivacionOpcion'
		,	codigo				INT '$.codigo'
		,	opcionTipo			INT '$.opcionTipo'
		,	nombrePropiedad		VARCHAR(50) '$.nombrePropiedad'
		,	atributoName VARCHAR(50) '$.atributoName'
		,	descripcion			VARCHAR(500) '$.descripcion'
		
		) as dj
		join dbo.DeceDerivacionOpcion ddo ON ddo.idDeceDerivacionOpcion = dj.idDeceDerivacionOpcion
		
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--======================================================================================================================

GO
IF OBJECT_ID('uspDeceDerivacionOpcionDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionOpcionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionOpcionDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionOpcionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)

	 IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacion WHERE idDeceDerivacionOpcion = @id)
			BEGIN 
				SET @message = 'Existe dependencias !Imposible Eliminar!'
				GOTO CONTROL_ERROR
			END

	BEGIN TRAN 
		
		DELETE FROM  dbo.DeceDerivacionOpcion WHERE idDeceDerivacionOpcion=@id	
		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionOpcion WHERE idDeceDerivacionOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
-----------------------------------------------GET------------------------------------------------------------------------------------------------

GO
IF OBJECT_ID('uspDeceDerivacionOpcionGet') IS NOT NULL
	DROP PROC uspDeceDerivacionOpcionGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionOpcionGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionOpcionGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT 

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT dop.[idDeceDerivacionOpcion]
	,	dop.[codigo]
	,	dop.[opcionTipo]
	,	ISNULL(dop.[atributoName],'') AS [atributoName]
	,	dop.[nombrePropiedad] 
	,	dop.[descripcion]
	,	dop.[fechaRegistro]
	,	dop.[estado]
	,	ISNULL(dd.idDeceDerivacion,0)													AS [data.idDeceDerivacionOpcion]
	,	CAST((CASE WHEN ISNULL(dd.idDeceDerivacion,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	FROM dbo.DeceDerivacionOpcion dop
	LEFT JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacionOpcion = dop.idDeceDerivacionOpcion
											AND dd.idDeceDerivacion = @id
		FOR JSON PATH ) AS payload
END

/*
	===============
	=============== *************************************************************************************************************************************
	=============== 
	=============== *************************************************************************************************************************************
	===============
*/
--===================================================================================================
--========================Listar de Derivacion ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionGet') IS NOT NULL
	DROP PROC uspDeceDerivacionGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@value VARCHAR(MAX)=NULL

set @value=(SELECT 
		dd.[idDeceDerivacion]
	,	dd.[nombreAlumno]
	,	dd.[curso]
	,	dd.[nombreInstitucion]
	,	dd.[direccionInstitucion]
	,	dd.[contactoInstitucion]
	,	dd.[nombreQuienDeriva] 
	,	dd.[contactoQuienDeriva]
	,	dd.[cargoQuienDeriva]
	,	CAST(dd.[fechaDerivacion] as DATE) AS fechaDerivacion
	,	ddop.[idDeceDerivacionOpcion]
	,	ddop.[descripcion]
	FROM dbo.DeceDerivacion dd
	INNER JOIN dbo.DeceDerivacionOpcion ddop ON	ddop.idDeceDerivacionOpcion = dd.idDeceDerivacionOpcion
	--AND dd.idDerivacion = 1
		FOR JSON PATH )

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END
GO
--===================================================================================================
--========================Listar de Derivacion BYID ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionByIdGet') IS NOT NULL
	DROP PROC uspDeceDerivacionByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionByIdGet 0, '{"id":1}'
CREATE PROC [dbo].[uspDeceDerivacionByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT 
		dd.[idDeceDerivacion]
	,	CAST(dd.[fechaNacimiento] as date) AS fechaNacimiento
	,	dd.[curso]
	,	dd.[gestion]
	,	dd.[nombreAlumno]
	,	dd.[codAlumno]
	,	dd.[nombreInstitucion]
	,	dd.[direccionInstitucion]
	,	dd.[contactoInstitucion]
	,	dd.[nombreQuienDeriva] 
	,	dd.[contactoQuienDeriva]
	,	dd.[cargoQuienDeriva]
	,	dd.[idModalidad]
	,	dd.[modalidad]
	,	dd.[idGrado]
	,	dd.[codigoGrado]
	,	dd.[descripcionGrado]
	,	dd.[idParalelo]
	,	dd.[paralelo]
	,	dd.[idTurno]
	,	dd.[turno]
	,	CAST(dd.[fechaDerivacion] as DATE) AS fechaDerivacion
	,	ddop.[idDeceDerivacionOpcion]

	FROM dbo.DeceDerivacion dd
	INNER JOIN dbo.DeceDerivacionOpcion ddop ON	ddop.idDeceDerivacionOpcion = dd.idDeceDerivacionOpcion
	AND  dd.idDeceDerivacion = @id
		FOR JSON PATH,  WITHOUT_ARRAY_WRAPPER) AS payload
END

--==============================================Insert===========================================================
GO
IF OBJECT_ID('uspDeceDerivacionInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInsert NULL, '{"idDeceDerivacion":0,"idDeceDerivacionOpcion":1,"nombreInstitucion":"Adventista","direccionInstitucion":"Mariano Paredes ","contactoInstitucion":"22785662","nombreQuienDeriva":"Jaime Broncas","contactoQuienDeriva":"09878545","cargoQuienDeriva":"Gerente General","fechaDerivacion":"2022-05-04T10:41:00","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDerivacionInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceDerivacion(idDeceDerivacionOpcion, nombreInstitucion, direccionInstitucion, contactoInstitucion, nombreQuienDeriva, contactoQuienDeriva, cargoQuienDeriva, fechaDerivacion, fechaRegistro, codAlumno, nombreAlumno, curso, fechaNacimiento, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol,idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT di.idDeceDerivacionOpcion, di.nombreInstitucion,  di.direccionInstitucion, di.contactoInstitucion, di.nombreQuienDeriva, di.contactoQuienDeriva, di.cargoQuienDeriva, CAST(di.fechaDerivacion AS DATE),@fechaHoy, di.codAlumno,di.nombreAlumno,di.curso, CAST(di.fechaNacimiento AS DATE), @idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol,di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON(@dataFormJson)
		WITH(

			idDeceDerivacionOpcion	INT	'$.idDeceDerivacionOpcion'
		,	nombreInstitucion		VARCHAR(300) '$.nombreInstitucion'
		,	direccionInstitucion	VARCHAR(300) '$.direccionInstitucion'
		,	contactoInstitucion		VARCHAR(15) '$.contactoInstitucion'
		,	nombreQuienDeriva		VARCHAR(100) '$.nombreQuienDeriva'
		,	contactoQuienDeriva		VARCHAR(15) '$.contactoQuienDeriva'
		,	cargoQuienDeriva		VARCHAR(100) '$.cargoQuienDeriva'
		,	fechaDerivacion			VARCHAR(20) '$.fechaDerivacion'

		,	codAlumno				INT	'$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	fechaNacimiento			VARCHAR(20) '$.fechaNacimiento'
		,	curso					VARCHAR(100) '$.curso'

		,	gestion					INT	'$.gestion	'	
		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceDerivacion d WHERE d.idDeceDerivacion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN
	--/No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--=================================================Update========================================================
GO
IF OBJECT_ID('uspDeceDerivacionUpdate') IS NOT NULL
	DROP PROC uspDeceDerivacionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionUpdate 0, 0, 0, 0
CREATE PROC uspDeceDerivacionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)= NULL

AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE dd	

		SET 
			dd.idDeceDerivacionOpcion = dj.idDeceDerivacionOpcion
		,	dd.nombreInstitucion	= dj.nombreInstitucion
		,	dd.direccionInstitucion	=	dj.direccionInstitucion
		,	dd.contactoInstitucion		= dj.contactoInstitucion
		,	dd.nombreQuienDeriva		= dj.nombreQuienDeriva
		,	dd.contactoQuienDeriva		= dj.contactoQuienDeriva
		,	dd.cargoQuienDeriva		=	dj.cargoQuienDeriva
		,	dd.fechaDerivacion			= CAST(dj.fechaDerivacion AS DATE)
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacion		INT	'$.idDeceDerivacion'
		,	idDeceDerivacionOpcion	INT	'$.idDeceDerivacionOpcion'
		,	nombreInstitucion		VARCHAR(300) '$.nombreInstitucion'
		,	direccionInstitucion	VARCHAR(300) '$.direccionInstitucion'
		,	contactoInstitucion		VARCHAR(15) '$.contactoInstitucion'
		,	nombreQuienDeriva		VARCHAR(100) '$.nombreQuienDeriva'
		,	contactoQuienDeriva		VARCHAR(15) '$.contactoQuienDeriva'
		,	cargoQuienDeriva		VARCHAR(100) '$.cargoQuienDeriva'
		,	fechaDerivacion			VARCHAR(20) '$.fechaDerivacion'
		
		) as dj
		join dbo.DeceDerivacion dd ON dd.idDeceDerivacion = dj.idDeceDerivacion
		Where dd.idDeceDerivacion = @id
		

	COMMIT TRAN
	--/No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd/
	
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--=====================================================Delete==========================================================================
GO
IF OBJECT_ID('uspDeceDerivacionDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)


	BEGIN TRAN 
				
		DELETE FROM dbo.DeceDerivacionDatoPersonalDerivado WHERE idDeceDerivacion = @id

		DELETE FROM dbo.DeceDerivacionInstitucionExterna WHERE idDeceDerivacion = @id

		DELETE FROM dbo.DeceDerivacionValoracionCaso WHERE idDeceDerivacion = @id

		DELETE FROM dbo.DeceDerivacion WHERE idDeceDerivacion = @id
		
		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacion WHERE idDeceDerivacion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--===================================================================================================
--======================== DeceDerivacionInstitucionExternaOpcion ===========================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaOpcionGet') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaOpcionGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaOpcionGet '','{"id":18}'
CREATE PROC [dbo].[uspDeceDerivacionInstitucionExternaOpcionGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT 

		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT dieop.[idDeceDerivacionInstitucionExternaOpcion]
	,	dieop.[codigo]
	,	dieop.[opcionTipo]
	,	ISNULL(dieop.[atributoName],'') AS [atributoName]
	,	dieop.[nombrePropiedad]
	,	dieop.[descripcion]
	,	dieop.[fechaRegistro]
	,	dieop.[estado]
	,	ISNULL(vs.idDeceDerivacionInstitucionExterna,0)													AS [data.idDeceDerivacionInstitucionExternaOpcion]
	,	CAST((CASE WHEN ISNULL(vs.idDeceDerivacionInstitucionExterna,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	--,	ISNULL(vs.descripcion,'')																		AS [data.descripcion]
	FROM dbo.DeceDerivacionInstitucionExternaOpcion dieop
	LEFT JOIN dbo.DeceDerivacionInstitucionExterna vs ON	vs.idDeceDerivacionInstitucionExternaOpcion = dieop.idDeceDerivacionInstitucionExternaOpcion
											AND vs.idDeceDerivacion = @id
		FOR JSON PATH ) AS payload
END

--select * from DeceDerivacionInstitucionExterna where idDeceDerivacion = 18

--=================================Insert============================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaOpcionInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaOpcionInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaOpcionInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionInstitucionExternaOpcionInsert
 @authClientJson NVARCHAR(MAX)
,@dataFormJson NVARCHAR(MAX)
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
			
		INSERT INTO dbo.DeceDerivacionInstitucionExternaOpcion([codigo], [opcionTipo], [nombrePropiedad], [atributoName], [descripcion], [fechaRegistro], [estado])
		SELECT di.codigo, di.opcionTipo, di.nombrePropiedad, di.atributoName, di.descripcion, @fechaHoy, 1
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo			INT '$.codigo'
		,	opcionTipo		INT '$.opcionTipo'
		,	nombrePropiedad VARCHAR(50) '$.nombrePropiedad'
		,	atributoName VARCHAR(50) '$.atributoName'
		,	descripcion		VARCHAR(50) '$.descripcion'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceDerivacionInstitucionExternaOpcion diexo WHERE diexo.idDeceDerivacionInstitucionExternaOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

---======================================================Update===============================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaOpcionUpdate') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaOpcionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionInstitucionExternaOpcionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE
 @gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	BEGIN TRAN 

		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
		UPDATE ddieo
				
		SET	ddieo.codigo = dj.codigo
		,	ddieo.opcionTipo = dj.opcionTipo
		,	ddieo.nombrePropiedad = dj.nombrePropiedad
		,	ddieo.atributoName = dj.atributoName
		,	ddieo.descripcion = dj.descripcion
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacionInstitucionExternaOpcion INT '$.idDeceDerivacionInstitucionExternaOpcion'
		,	codigo			INT '$.codigo'
		,	opcionTipo		INT '$.opcionTipo'
		,	nombrePropiedad VARCHAR(50) '$.nombrePropiedad'
		,	atributoName VARCHAR(50) '$.atributoName'
		,	descripcion		VARCHAR(50) '$.descripcion'	
		
		) as dj
		join dbo.DeceDerivacionInstitucionExternaOpcion ddieo ON ddieo.idDeceDerivacionInstitucionExternaOpcion = dj.idDeceDerivacionInstitucionExternaOpcion
		WHERE ddieo.idDeceDerivacionInstitucionExternaOpcion=@id
		
		
	COMMIT TRAN
	
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

----=====================================================Delete====================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaOpcionDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaOpcionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaOpcionDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionInstitucionExternaOpcionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)

	 IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionInstitucionExterna WHERE idDeceDerivacionInstitucionExternaOpcion = @id)
			BEGIN 
				SET @message = 'Existe dependencias !Imposible Eliminar!'
				GOTO CONTROL_ERROR
			END

	BEGIN TRAN 
		
		DELETE FROM dbo.DeceDerivacionInstitucionExternaOpcion WHERE idDeceDerivacionInstitucionExternaOpcion =@id
		
		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionInstitucionExternaOpcion WHERE idDeceDerivacionInstitucionExternaOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN 
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO



--===================================================================================================
--========================Listar de INSTITUCION EXTERNA ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaGet') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionInstitucionExternaGet] 
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT ddiex.[idDeceDerivacionInstitucionExterna]
	,	ddiex.[descripcion]
	,	dd.[idDeceDerivacion]
	,	ddiexop.[idDeceDerivacionInstitucionExternaOpcion]
	,	ddiexop.[codigo]
	,	ddiexop.[opcionTipo]
	,	ISNULL(ddiexop.[atributoName],'') AS [atributoName]
	,	ddiexop.[nombrePropiedad]
	,	ddiexop.[descripcion] AS descripcionOpcion
	,	ddiexop.[fechaRegistro]
	,	ddiexop.[estado]
	FROM dbo.DeceDerivacionInstitucionExterna ddiex
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddiex.idDeceDerivacion
	INNER JOIN dbo.DeceDerivacionInstitucionExternaOpcion ddiexop ON	ddiexop.idDeceDerivacionInstitucionExternaOpcion = ddiex.idDeceDerivacionInstitucionExternaOpcion
	--AND dd.idDerivacion = 1
		FOR JSON PATH ) AS payload
END

--===================================================================================================
--========================Listar de INSTITUCION EXTERNA BYID ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaByIdGet') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionInstitucionExternaByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT ddiex.[idDeceDerivacionInstitucionExterna]
	--,	ddiex.[descripcion]
	,	dd.[idDeceDerivacion]
	--,	dd.[nombreInstitucion]
	--,	dd.[direccionInstitucion]
	--,	dd.[contactoInstitucion]
	--,	dd.[nombreQuienDeriva] 
	--,	dd.[contactoQuienDeriva]
	--,	dd.[cargoQuienDeriva]
	--,	dd.[fechaDerivacion]
	,	ddiexop.[idDeceDerivacionInstitucionExternaOpcion]
	,	ddiexop.[codigo]
	,	ddiexop.[opcionTipo]
	,	ISNULL(ddiexop.[atributoName],'') AS [atributoName]
	,	ddiexop.[nombrePropiedad]
	,	ddiexop.[descripcion] 
	,	ddiexop.[fechaRegistro]
	,	ddiexop.[estado]
	FROM dbo.DeceDerivacionInstitucionExterna ddiex
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddiex.idDeceDerivacion
	INNER JOIN dbo.DeceDerivacionInstitucionExternaOpcion ddiexop ON	ddiexop.idDeceDerivacionInstitucionExternaOpcion = ddiex.idDeceDerivacionInstitucionExternaOpcion
	AND dd.idDeceDerivacion = @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER  ) AS payload
END
-- =============================Insert================================================

GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaInsert
GO 
-- =============================================
-- Author:		Jefferson Mena '
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionInstitucionExternaInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDerivacion INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			/* REVISAR CAMBIOS */
		SELECT @idDeceDerivacion = di.idDeceDerivacion
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacion							INT '$.idDeceDerivacion'
		)	AS di

		INSERT INTO dbo.DeceDerivacionInstitucionExterna( [idDeceDerivacion], [idDeceDerivacionInstitucionExternaOpcion], [descripcion], [fechaRegistro])
		SELECT @idDeceDerivacion, di.idDeceDerivacionInstitucionExternaOpcion, '', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.dieop') 
		WITH (
			idDeceDerivacionInstitucionExternaOpcion	INT '$.idDeceDerivacionInstitucionExternaOpcion'
		)	AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceDerivacionInstitucionExterna diex  WHERE diex.idDeceDerivacionInstitucionExterna = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


---================================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaUpdate') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaUpdate '','{"id":21}','{"idDeceDerivacionInstitucionExterna":0,"idDeceDerivacion":21,"dieop":[{"idDeceDerivacionInstitucionExternaOpcion":1,"codigo":1,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"unidadPoliciaNacional","descripcion":"Unidades especializadas de la policía nacional","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":2,"codigo":2,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"juntaProteccionDerecho","descripcion":"Juntas de protección de derechos","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":3,"codigo":3,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"fiscalia","descripcion":"Fiscalía","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":4,"codigo":4,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"unidadJudicial","descripcion":"Unidades judiciales","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":5,"codigo":5,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"saludPublica","descripcion":"Establecimientos de salud públicos","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":6,"codigo":6,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"saludPrivada","descripcion":"Establecimientos de salud privados","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":7,"codigo":7,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"ddEducacion","descripcion":"Dirección Distrital de Educación","fechaRegistro":"2022-04-22T11:03:07.11","estado":true},{"idDeceDerivacionInstitucionExternaOpcion":8,"codigo":8,"opcionTipo":2,"atributoName":"institucionExterna","nombrePropiedad":"udai","descripcion":"UDAI","fechaRegistro":"2022-04-22T11:03:07.11","estado":true}],"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDerivacionInstitucionExternaUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = js.id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)	AS js
	print @id
	BEGIN TRAN 

		DELETE dei FROM dbo.DeceDerivacionInstitucionExterna dei
		WHERE dei.idDeceDerivacion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.dieop') 
			WITH ( idDeceDerivacionInstitucionExternaOpcion	INT '$.idDeceDerivacionInstitucionExternaOpcion' )	AS di
			WHERE dei.idDeceDerivacionInstitucionExternaOpcion = di.idDeceDerivacionInstitucionExternaOpcion
		)

		INSERT INTO dbo.DeceDerivacionInstitucionExterna( [idDeceDerivacion], [idDeceDerivacionInstitucionExternaOpcion], [descripcion], [fechaRegistro])

		SELECT @id, di1.idDeceDerivacionInstitucionExternaOpcion, '', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.dieop') 
		WITH (
			idDeceDerivacionInstitucionExternaOpcion	INT '$.idDeceDerivacionInstitucionExternaOpcion'
		)	AS di1

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDerivacionInstitucionExterna di2
			WHERE  di2.idDeceDerivacion = @id
			AND di2.idDeceDerivacionInstitucionExternaOpcion = di1.idDeceDerivacionInstitucionExternaOpcion
			)
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 		
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--Select * from DeceDerivacionInstitucionExterna


--==================================================Delete========================================================================
GO
IF OBJECT_ID('uspDeceDerivacionInstitucionExternaDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionInstitucionExternaDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionInstitucionExternaDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionInstitucionExternaDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)

	BEGIN TRAN 
		
		DELETE FROM dbo.DeceDerivacionInstitucionExterna WHERE idDeceDerivacionInstitucionExterna = @id

		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionInstitucionExterna WHERE idDeceDerivacionInstitucionExterna = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--===================================================================================================
--========================Listar de DatoPersonalDerivado  ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionDatoPersonalDerivadoGet') IS NOT NULL
	DROP PROC uspDeceDerivacionDatoPersonalDerivadoGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDatoPersonalDerivadoGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionDatoPersonalDerivadoGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value=(SELECT ddpd.[idDeceDerivacionDatoPersonalDerivado]
	,	ddpd.[edad]
	,	CAST(ddpd.[fechaNacimiento] as date) AS fechaNacimiento
	,	ddpd.[curso]
	,	ddpd.[direccionDomiciliaria]
	,	ddpd.[nombreAlumno]
	,	ddpd.[nombrePadre]
	,	ddpd.[numeroTelefonico]
	,	ddpd.[nombreMadre]
	,	dd.[idDeceDerivacion]
	,	ddpd.[codAlumno]

	,	ddpd.[idModalidad]
	,	ddpd.[modalidad]
	,	ddpd.[idGrado]
	,	ddpd.[codigoGrado]
	,	ddpd.[descripcionGrado]
	,	ddpd.[idParalelo]
	,	ddpd.[paralelo]
	,	ddpd.[idTurno]
	,	ddpd.[turno]
	,	g.[codGenero]
	,	g.[descripcion]
	FROM dbo.DeceDerivacionDatoPersonalDerivado ddpd
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddpd.idDeceDerivacion
	INNER JOIN dbo.Genero g ON	g.CodGenero = ddpd.idGenero
		FOR JSON PATH )
	
	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN

END


--===================================================================================================
--========================Listar de DatoPersonalDerivado BYID ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionDatoPersonalDerivadoByIdGet') IS NOT NULL
	DROP PROC uspDeceDerivacionDatoPersonalDerivadoByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDatoPersonalDerivadoGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionDatoPersonalDerivadoByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
SET @value = (SELECT ddpd.[idDeceDerivacionDatoPersonalDerivado]
	,	ddpd.[edad]
	,	CAST(ddpd.[fechaNacimiento] as date) AS fechaNacimiento
	,	ddpd.[curso]
	,	ddpd.[direccionDomiciliaria]
	,	ddpd.[nombreAlumno]
	,	ddpd.[nombrePadre]
	,	ddpd.[nombreMadre]
	,	ddpd.[numeroTelefonico]
	,	dd.[idDeceDerivacion]
	,	ddpd.[codAlumno]

	,	ddpd.[gestion]
	,	ddpd.[idModalidad]
	,	ddpd.[modalidad]
	,	ddpd.[idGrado]
	,	ddpd.[codigoGrado]
	,	ddpd.[descripcionGrado]
	,	ddpd.[idParalelo]
	,	ddpd.[paralelo]
	,	ddpd.[idTurno]
	,	ddpd.[turno]
	,	g.[codGenero]
	,	g.[descripcion]
	FROM dbo.DeceDerivacionDatoPersonalDerivado ddpd
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddpd.idDeceDerivacion
	INNER JOIN dbo.Genero g ON	g.CodGenero = ddpd.idGenero
	AND dd.idDeceDerivacion = @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER  )

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
		--select *from DeceDerivacionDatoPersonalDerivado
END
-- ===============================================Insert=========================================

GO
IF OBJECT_ID('uspDeceDerivacionDatoPersonalDerivadoInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionDatoPersonalDerivadoInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDatoPersonalDerivadoInsert null,'{"idDeceDerivacionDatoPersonalDerivado":0,"idDeceDerivacion":12,"codAlumno":14374,"idGenero":1,"edad":22,"fechaNacimiento":"2022-05-05T00:00:00","curso":"Septimode Básica","direccionDomiciliaria":"DSHDF","nombrePadre":"EL","numeroTelefonico":"786522","nombreMadre":"ELLA","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDerivacionDatoPersonalDerivadoInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			 
		INSERT INTO dbo.DeceDerivacionDatoPersonalDerivado (idDeceDerivacion, codAlumno, nombreAlumno, idGenero, edad, fechaNacimiento, curso, direccionDomiciliaria, nombrePadre, numeroTelefonico, nombreMadre, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT di.idDeceDerivacion, di.codAlumno,di.nombreAlumno, di.idGenero, di.edad, CAST(di.fechaNacimiento AS DATE), di.curso, di.direccionDomiciliaria, di.nombrePadre , di.numeroTelefonico, di.nombreMadre,@fechaHoy, @idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacion		INT	'$.idDeceDerivacion'
		,	codAlumno				INT	'$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	idGenero				INT	'$.idGenero'
		,	edad					INT	'$.edad'
		,	fechaNacimiento			VARCHAR(20) '$.fechaNacimiento'
		,	curso					VARCHAR(100) '$.curso'
		,	direccionDomiciliaria   VARCHAR(500) '$.direccionDomiciliaria'
		,	nombrePadre				VARCHAR(100) '$.nombrePadre'
		,	numeroTelefonico		VARCHAR(20) '$.numeroTelefonico'
		,	nombreMadre				VARCHAR(100) '$.nombreMadre'
		
 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		) AS di 
		
		SET @id = @@IDENTITY
		IF NOT EXISTS(SELECT * FROM dbo.DeceDerivacionDatoPersonalDerivado ddpd WHERE ddpd.idDeceDerivacionDatoPersonalDerivado = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

		SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--=============================================Update====================================================
GO
IF OBJECT_ID('uspDeceDerivacionDatoPersonalDerivadoUpdate') IS NOT NULL
	DROP PROC uspDeceDerivacionDatoPersonalDerivadoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDatoPersonalDerivadoUpdate 0, 0, 0, 0
CREATE PROC uspDeceDerivacionDatoPersonalDerivadoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		
		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE dddpd
		
		SET dddpd.idDeceDerivacion	=  dj.idDeceDerivacion
		,	dddpd.codAlumno			=  dj.codAlumno
		,	dddpd.nombreAlumno			=  dj.nombreAlumno
		,	dddpd.idGenero			=  dj.idGenero
		,	dddpd.edad				=  dj.edad
		,	dddpd.fechaNacimiento	=  CAST(dj.fechaNacimiento AS DATE)
		,	dddpd.curso				=  dj.curso
		,	dddpd.direccionDomiciliaria =  dj.direccionDomiciliaria
		,	dddpd.nombrePadre			=  dj.nombrePadre
		,	dddpd.numeroTelefonico		=  dj.numeroTelefonico
		,	dddpd.nombreMadre			=  dj.nombreMadre
		
 		,	dddpd.idModalidad			=  dj.idModalidad					
 		,	dddpd.modalidad				=  dj.modalidad				
 		,	dddpd.idGrado				=  dj.idGrado						
 		,	dddpd.codigoGrado			=  dj.codigoGrado					
 		,	dddpd.descripcionGrado		=  dj.descripcionGrado		
 		,	dddpd.idParalelo			=  dj.idParalelo					
 		,	dddpd.paralelo				=  dj.paralelo				
		,	dddpd.idTurno				=  dj.idTurno						
		,	dddpd.turno					=  dj.turno					 
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
		
			idDeceDerivacion		INT	'$.idDeceDerivacion'
		,	codAlumno				INT	'$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	idGenero				INT	'$.idGenero'
		,	edad					INT	'$.edad'
		,	fechaNacimiento			VARCHAR(20) '$.fechaNacimiento'
		,	curso					VARCHAR(100) '$.curso'
		,	direccionDomiciliaria   VARCHAR(500) '$.direccionDomiciliaria'
		,	nombrePadre				VARCHAR(100) '$.nombrePadre'
		,	numeroTelefonico		VARCHAR(20) '$.numeroTelefonico'
		,	nombreMadre				VARCHAR(100) '$.nombreMadre'

 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		) as dj
		join dbo.DeceDerivacionDatoPersonalDerivado dddpd ON dddpd.idDeceDerivacion = dj.idDeceDerivacion
		WHERE dddpd.idDeceDerivacion = @id

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 	
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--===================================================Delete==========================================================
GO
IF OBJECT_ID('uspDeceDerivacionDatoPersonalDerivadoDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionDatoPersonalDerivadoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionDatoPersonalDerivadoDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionDatoPersonalDerivadoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)

	BEGIN TRAN 

		DELETE FROM dbo.DeceDerivacionDatoPersonalDerivado WHERE idDeceDerivacionDatoPersonalDerivado = @id
		
		
		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionDatoPersonalDerivado WHERE idDeceDerivacionDatoPersonalDerivado = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
			
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--===================================================================================================
--======================== Derivacion Valoracion Caso  ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionValoracionCasoGet') IS NOT NULL
	DROP PROC uspDeceDerivacionValoracionCasoGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionValoracionCasoGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionValoracionCasoGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT ddvc.[idDeceDerivacionValoracionCaso]
	,	ddvc.[motivoReferencia]
	,	ddvc.[descripcionProblematica]
	,	ddvc.[accionDesarrollada]
	,	ddvc.[observaciones]
	,	dd.[idDeceDerivacion]

	FROM dbo.DeceDerivacionValoracionCaso ddvc
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddvc.idDeceDerivacion
	--AND dd.idDerivacion = 1
		FOR JSON PATH ) AS payload
END


--===================================================================================================
--======================== ValoracionCaso BYID  ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceDerivacionValoracionCasoByIdGet') IS NOT NULL
	DROP PROC uspDeceDerivacionValoracionCasoByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionValoracionCasoByIdGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceDerivacionValoracionCasoByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value=(SELECT ddvc.[idDeceDerivacionValoracionCaso]
	,	ddvc.[motivoReferencia]
	,	ddvc.[descripcionProblematica]
	,	ddvc.[accionDesarrollada]
	,	ddvc.[observaciones]
	,	dd.[idDeceDerivacion]
	FROM dbo.DeceDerivacionValoracionCaso ddvc
	INNER JOIN dbo.DeceDerivacion dd ON	dd.idDeceDerivacion = ddvc.idDeceDerivacion
	AND dd.idDeceDerivacion = @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER  ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END

-- ===============================Insert==============
GO
IF OBJECT_ID('uspDeceDerivacionValoracionCasoInsert') IS NOT NULL
	DROP PROC uspDeceDerivacionValoracionCasoInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionValoracionCasoInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionValoracionCasoInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceDerivacionValoracionCaso( [idDeceDerivacion], [motivoReferencia], [descripcionProblematica], [accionDesarrollada],[observaciones],[fechaRegistro])
		SELECT di.idDeceDerivacion, di.motivoReferencia, di.descripcionProblematica, di.accionDesarrollada, di.observaciones,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacion			INT	'$.idDeceDerivacion'
		,	motivoReferencia			VARCHAR(100) '$.motivoReferencia'
		,	descripcionProblematica     VARCHAR(100) '$.descripcionProblematica'
		,	accionDesarrollada			VARCHAR(100) '$.accionDesarrollada'
		,	observaciones				VARCHAR(100) '$.observaciones'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceDerivacionValoracionCaso dvc WHERE dvc.idDeceDerivacionValoracionCaso = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--========================================Update===========================================================
GO
IF OBJECT_ID('uspDeceDerivacionValoracionCasoUpdate') IS NOT NULL
	DROP PROC uspDeceDerivacionValoracionCasoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionInsert 0, 0, 0, 0
CREATE PROC uspDeceDerivacionValoracionCasoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		
		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE ddvc
		
		SET 
			ddvc.idDeceDerivacion			=  dj.idDeceDerivacion
		,	ddvc.motivoReferencia			=     dj.motivoReferencia
		,	ddvc.descripcionProblematica    =     dj.descripcionProblematica
		,	ddvc.accionDesarrollada			=     dj.accionDesarrollada
		,	ddvc.observaciones				=     dj.observaciones
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDerivacion			INT	'$.idDeceDerivacion'
		,	motivoReferencia			VARCHAR(1000) '$.motivoReferencia'
		,	descripcionProblematica     VARCHAR(1000) '$.descripcionProblematica'
		,	accionDesarrollada			VARCHAR(1000) '$.accionDesarrollada'
		,	observaciones				VARCHAR(1000) '$.observaciones'
		
		) as dj
		join dbo.DeceDerivacionValoracionCaso ddvc ON ddvc.idDeceDerivacion = dj.idDeceDerivacion
		WHERE ddvc.idDeceDerivacion = @id

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 	
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--=================================================Delete====================================================================
GO
IF OBJECT_ID('uspDeceDerivacionValoracionCasoDelete') IS NOT NULL
	DROP PROC uspDeceDerivacionValoracionCasoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDerivacionValoracionCasoDelete 0, 0, 0, 0
CREATE PROC uspDeceDerivacionValoracionCasoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
 	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT    '$.id'
	)

	BEGIN TRAN 
		
		DELETE FROM dbo.DeceDerivacionValoracionCaso WHERE idDeceDerivacionValoracionCaso = @id

		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceDerivacionValoracionCaso WHERE idDeceDerivacionValoracionCaso = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO



/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 6 Formulario ATENCION A REPRESENTANTES
	=============== *************************************************************************************************************************************
	===============
*/

--===================================================================================================
--========================Listar de Atencion Representante ============================================================
--=================================================================================================

GO
IF OBJECT_ID('uspDeceAtencionRepresentanteGet') IS NOT NULL
	DROP PROC uspDeceAtencionRepresentanteGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionRepresentateGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceAtencionRepresentanteGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@value VARCHAR(MAX) = NULL


	SET @value=	(SELECT atr.[idDeceAtencionRepresentante]
	,	atr.[codigo]
	,	CAST(atr.[fechaAtencion] as DATE) AS fechaAtencion
	,	atr.[medioAtencion]
	,	atr.[curso] 
	,	atr.[representante]
	,	atr.[asunto]
	,	atr.[fechaRegistro]
	,	atr.[actividadRealizada]
	,	atr.[acuerdosCompromisos]	
	,	atr.[evidencia]
	,	atr.[codAlumno]
	,	atr.[nombreAlumno]

	,	atr.[gestion]
	,	atr.[idModalidad]
	,	atr.[modalidad]
	,	atr.[idGrado]
	,	atr.[codigoGrado]
	,	atr.[descripcionGrado]
	,	atr.[idParalelo]
	,	atr.[paralelo]
	,	atr.[idTurno]
	,	atr.[turno]

	FROM dbo.DeceAtencionRepresentante atr
	--AND atr.idDeceAtencionRepresentante = 12
		FOR JSON PATH ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END

--===================================================================================================
--========================Listar de Atencion Representante ById============================================================
--=================================================================================================

GO
IF OBJECT_ID('uspDeceAtencionRepresentanteByIdGet') IS NOT NULL
	DROP PROC uspDeceAtencionRepresentanteByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionRepresentateGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceAtencionRepresentanteByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX) = NULL

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value =(SELECT atr.[idDeceAtencionRepresentante]
	,	atr.[codigo]
	,	CAST(atr.[fechaAtencion] as DATE) AS fechaAtencion
	,	atr.[medioAtencion]
	,	atr.[curso] 
	,	atr.[representante]
	,	atr.[asunto]
	,	atr.[fechaRegistro]
	,	atr.[actividadRealizada]
	,	atr.[acuerdosCompromisos]	
	,	atr.[evidencia]
	,	atr.[codAlumno]
	,	atr.[nombreAlumno]

	,	atr.[gestion]
	,	atr.[idModalidad]
	,	atr.[modalidad]
	,	atr.[idGrado]
	,	atr.[codigoGrado]
	,	atr.[descripcionGrado]
	,	atr.[idParalelo]
	,	atr.[paralelo]
	,	atr.[idTurno]
	,	atr.[turno]
	FROM dbo.DeceAtencionRepresentante atr

	WHERE atr.idDeceAtencionRepresentante = @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN

END


GO
IF OBJECT_ID('uspDeceAtencionRepresentanteInsert') IS NOT NULL
	DROP PROC uspDeceAtencionRepresentanteInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionRepresentanteInsert 0, 0, 0, 0
CREATE PROC uspDeceAtencionRepresentanteInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceAtencionRepresentante(codigo, fechaAtencion, medioAtencion, curso, codAlumno, nombreAlumno, representante, asunto, actividadRealizada, acuerdosCompromisos, evidencia, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT  di.codigo, CAST(fechaAtencion AS DATE), di.medioAtencion, di.curso, di.codAlumno, di.nombreAlumno, di.representante, di.asunto , di.actividadRealizada , di.acuerdosCompromisos , di.evidencia ,@fechaHoy,@idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo				VARCHAR(50)	'$.codigo'
		,	fechaAtencion		VARCHAR(20) '$.fechaAtencion'
		,	medioAtencion		VARCHAR(100) '$.medioAtencion'
		,	curso				VARCHAR(100)	'$.curso'
		,	codAlumno			INT	 '$.codAlumno'
		,	nombreAlumno		VARCHAR(500) '$.nombreAlumno'
		,	representante		VARCHAR(100) '$.representante'
		,	asunto				VARCHAR(100) '$.asunto'
		,	actividadRealizada  VARCHAR(100) '$.actividadRealizada'
		,	acuerdosCompromisos VARCHAR(300) '$.acuerdosCompromisos'
		,	evidencia			VARCHAR(300) '$.evidencia'

 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		)	AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceAtencionRepresentante atre WHERE atre.idDeceAtencionRepresentante = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--=================================================================================================================
GO
IF OBJECT_ID('uspDeceAtencionRepresentanteUpdate') IS NOT NULL
	DROP PROC uspDeceAtencionRepresentanteUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionRepresentanteUpdate 0, '{"id":12}','{"idDeceAtencionRepresentante":12,"codigo":"12345","fechaAtencion":"2022-05-05T00:00:00","medioAtencion":"Zoom","curso":"Octavo de Básica","codAlumno":28917,"representante":"sssssssss","asunto":"sssssssssssssssssssssssssssusracssss","actividadRealizada":"ssssssssssssssssssssssssss","acuerdosCompromisos":"sssssssss","evidencia":"sssssssssssssssssssssss","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceAtencionRepresentanteUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT '$.id'
	)	

		UPDATE ar 		

		SET ar.codigo			=	auth.codigo
		,	ar.fechaAtencion	=   CAST(auth.fechaAtencion AS DATE)
		,	ar.medioAtencion	=	auth.medioAtencion
		,	ar.curso			=	auth.curso
		,	ar.codAlumno		=	auth.codAlumno
		,	ar.nombreAlumno			=	auth.nombreAlumno
		,	ar.representante	=	auth.representante
		,	ar.asunto			=	auth.asunto
		,	ar.actividadRealizada	=	auth.actividadRealizada
		,	ar.acuerdosCompromisos	=	auth.acuerdosCompromisos
		,	ar.evidencia			=	auth.evidencia
				
 		,	ar.idModalidad			=  auth.idModalidad					
 		,	ar.modalidad			=  auth.modalidad				
 		,	ar.idGrado				=  auth.idGrado						
 		,	ar.codigoGrado			=  auth.codigoGrado					
 		,	ar.descripcionGrado		=  auth.descripcionGrado		
 		,	ar.idParalelo			=  auth.idParalelo					
 		,	ar.paralelo				=  auth.paralelo				
		,	ar.idTurno				=  auth.idTurno						
		,	ar.turno				=  auth.turno
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceAtencionRepresentante		INT	'$.idDeceAtencionRepresentante'
		,	codigo							VARCHAR(50)	'$.codigo'
		,	fechaAtencion					VARCHAR(20) '$.fechaAtencion'
		,	medioAtencion					VARCHAR(100) '$.medioAtencion'
		,	curso							VARCHAR(100) '$.curso'
		,	codAlumno						INT	'$.codAlumno'
		,	nombreAlumno					VARCHAR(500) '$.nombreAlumno'
		,	representante					VARCHAR(100) '$.representante'
		,	asunto							VARCHAR(100) '$.asunto'
		,	actividadRealizada				VARCHAR(100) '$.actividadRealizada'
		,	acuerdosCompromisos				VARCHAR(300) '$.acuerdosCompromisos'
		,	evidencia						VARCHAR(300) '$.evidencia'

 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		) as auth
		join dbo.DeceAtencionRepresentante ar ON ar.idDeceAtencionRepresentante = auth.idDeceAtencionRepresentante
		WHERE ar.idDeceAtencionRepresentante = @id

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 	
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--==================================================================================================
GO
IF OBJECT_ID('uspDeceAtencionRepresentanteDelete') IS NOT NULL
	DROP PROC uspDeceAtencionRepresentanteDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionRepresentanteDelete 0, 0, 0, 0
CREATE PROC uspDeceAtencionRepresentanteDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

SET NOCOUNT ON;

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT '$.id'
	)

	BEGIN TRAN 
					
		DELETE FROM dbo.DeceAtencionRepresentante WHERE idDeceAtencionRepresentante =@id

		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceAtencionRepresentante WHERE idDeceAtencionRepresentante = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 6 Formulario ATENCION A ESTUDIANTE
	=============== *************************************************************************************************************************************
	===============
*/


--===================================================================================================
--========================Listar de Atencion Alumno ============================================================
--=================================================================================================

GO
IF OBJECT_ID('uspDeceAtencionAlumnoGet') IS NOT NULL
	DROP PROC uspDeceAtencionAlumnoGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionAlumnoGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceAtencionAlumnoGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@value VARCHAR(MAX) = NULL
	
	SET @value =(SELECT aal.[idDeceAtencionAlumno]
	,	aal.[codigo]
	,	CAST(aal.[fechaAtencion]as DATE) AS fechaAtencion
	,	aal.[medioAtencion]
	,	aal.[curso] 
	,	aal.[asunto]
	,	aal.[fechaRegistro]
	,	aal.[actividadRealizada]
	,	aal.[acuerdosCompromisos]
	,	aal.[evidencia]
	,	aal.[codAlumno]
	,	aal.[nombreAlumno]

	,	aal.[idModalidad]
	,	aal.[modalidad]
	,	aal.[idGrado]
	,	aal.[codigoGrado]
	,	aal.[descripcionGrado]
	,	aal.[idParalelo]
	,	aal.[paralelo]
	,	aal.[idTurno]
	,	aal.[turno]
	FROM dbo.DeceAtencionAlumno aal
	
	--AND aal.idDeceAtencionAlumno = 1
		FOR JSON PATH ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END
--===================================================================================================
--========================Listar de Atencion Alumno ById ============================================================
--=================================================================================================

GO
IF OBJECT_ID('uspDeceAtencionAlumnoByIdGet') IS NOT NULL
	DROP PROC uspDeceAtencionAlumnoByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionAlumnoByIdGet 0, '{"id":1}'
CREATE PROC [dbo].[uspDeceAtencionAlumnoByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT 
, @value VARCHAR(MAX) = NULL

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value =(SELECT aal.[idDeceAtencionAlumno]
	,	aal.[codigo]
	,	CAST(aal.[fechaAtencion] as DATE) AS fechaAtencion
	,	aal.[medioAtencion]
	,	aal.[curso] 
	,	aal.[asunto]
	,	aal.[fechaRegistro]
	,	aal.[actividadRealizada]
	,	aal.[acuerdosCompromisos]
	,	aal.[evidencia]
	,	aal.[codAlumno]
	,	aal.[nombreAlumno]

	,	aal.[idModalidad]
	,	aal.[modalidad]
	,	aal.[idGrado]
	,	aal.[codigoGrado]
	,	aal.[descripcionGrado]
	,	aal.[idParalelo]
	,	aal.[paralelo]
	,	aal.[idTurno]
	,	aal.[turno]

	FROM dbo.DeceAtencionAlumno aal
	WHERE aal.idDeceAtencionAlumno = @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )
	
	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END


GO
IF OBJECT_ID('uspDeceAtencionAlumnoInsert') IS NOT NULL
	DROP PROC uspDeceAtencionAlumnoInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionAlumnoInsert 0, 0, 0, 0
CREATE PROC uspDeceAtencionAlumnoInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceAtencionAlumno(codigo, fechaAtencion, medioAtencion, curso, codAlumno, nombreAlumno, asunto, actividadRealizada, acuerdosCompromisos, evidencia, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno )
		SELECT di.codigo, CAST(di.fechaAtencion AS DATE) , di.medioAtencion, di.curso, di.codAlumno, di.nombreAlumno, di.asunto , di.actividadRealizada , di.acuerdosCompromisos , di.evidencia ,@fechaHoy,@idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo				VARCHAR(50)	'$.codigo'
		,	fechaAtencion		VARCHAR(20) '$.fechaAtencion'
		,	medioAtencion		VARCHAR(100) '$.medioAtencion'
		,	curso				VARCHAR(100) '$.curso'
		,	codAlumno			INT	'$.codAlumno'
		,	nombreAlumno		VARCHAR(500) '$.nombreAlumno'
		,	asunto				VARCHAR(100) '$.asunto'
		,	actividadRealizada  VARCHAR(100) '$.actividadRealizada'
		,	acuerdosCompromisos VARCHAR(300) '$.acuerdosCompromisos'
		,	evidencia			VARCHAR(300) '$.evidencia'

 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'

		)	AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceAtencionAlumno atal WHERE atal.idDeceAtencionAlumno = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--========================================================================================================
GO
IF OBJECT_ID('uspDeceAtencionAlumnoUpdate') IS NOT NULL
	DROP PROC uspDeceAtencionAlumnoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionAlumnoUpdate 0, 0, 0, 0
CREATE PROC uspDeceAtencionAlumnoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE atal
		SET atal.codigo			=	dj.codigo
		,	atal.fechaAtencion	=   CAST(dj.fechaAtencion AS DATE)
		,	atal.medioAtencion	=	dj.medioAtencion
		,	atal.curso			=	dj.curso
		,	atal.codAlumno		=	dj.codAlumno
		,	atal.nombreAlumno	=	dj.nombreAlumno
		,	atal.asunto			=	dj.asunto
		,	atal.actividadRealizada		=	dj.actividadRealizada
		,	atal.acuerdosCompromisos    =	dj.acuerdosCompromisos
		,	atal.evidencia				=	dj.evidencia	
			
 		,	atal.idModalidad		=  dj.idModalidad					
 		,	atal.modalidad			=  dj.modalidad				
 		,	atal.idGrado			=  dj.idGrado						
 		,	atal.codigoGrado		=  dj.codigoGrado					
 		,	atal.descripcionGrado	=  dj.descripcionGrado		
 		,	atal.idParalelo			=  dj.idParalelo					
 		,	atal.paralelo			=  dj.paralelo				
		,	atal.idTurno			=  dj.idTurno						
		,	atal.turno				=  dj.turno	

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceAtencionAlumno	INT	'$.idDeceAtencionAlumno'
		,	codigo					VARCHAR(50)	'$.codigo'
		,	fechaAtencion			VARCHAR(20) '$.fechaAtencion'
		,	medioAtencion			VARCHAR(100) '$.medioAtencion'
		,	curso					VARCHAR(100) '$.curso'
		,	codAlumno				INT	'$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	asunto					VARCHAR(100) '$.asunto'
		,	actividadRealizada		VARCHAR(100) '$.actividadRealizada'
		,	acuerdosCompromisos     VARCHAR(300) '$.acuerdosCompromisos'
		,	evidencia				VARCHAR(300) '$.evidencia'

 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		) as dj
		join dbo.DeceAtencionAlumno atal ON atal.idDeceAtencionAlumno = dj.idDeceAtencionAlumno
		WHERE atal.idDeceAtencionAlumno = @id
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 	
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--===============================================================================
GO
IF OBJECT_ID('uspDeceAtencionAlumnoDelete') IS NOT NULL
	DROP PROC uspDeceAtencionAlumnoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceAtencionAlumnoDelete 0, 0, 0, 0
CREATE PROC uspDeceAtencionAlumnoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN
	
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT '$.id'
		)
		DELETE FROM dbo.DeceAtencionAlumno WHERE idDeceAtencionAlumno = @id

		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceAtencionAlumno WHERE idDeceAtencionAlumno = @id)
			BEGIN 
				SET @message = 'Existe Tabla Relacionada con el id'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


/*
	===============
	=============== *************************************************************************************************************************************
	=============== Anexo 8 Formulario CASO INDIVIDUAL
	=============== *************************************************************************************************************************************
	===============
*/
--===================================================================================================
--========================Listar de SeguimientoCasoIndividual  ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceSeguimientoCasoIndividualGet') IS NOT NULL
	DROP PROC uspDeceSeguimientoCasoIndividualGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSeguimientoCasoIndividualGet 0, 0, 0, 0
CREATE PROC [dbo].[uspDeceSeguimientoCasoIndividualGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@value VARCHAR(MAX) = NULL


	SET @value =	(SELECT dsci.[idDeceSeguimientoCasoIndividual]
	,	CAST(dsci.fechaNacimiento as Date) AS fechaNacimiento
	,	dsci.[curso]
	,	CAST(dsci.[fechaAperturaSeguimiento] as DATE) AS fechaAperturaSeguimiento
	,	dsci.[nombreRemitente]
	,	dsci.[nombreInstitucion]
	,	dsci.[accionesRealizadas]
	,	dsci.[acuerdos]
	,	dsci.[recomendacionesSugerencias]
	,	dsci.[codAlumno]
	,	dsci.[nombreAlumno]

	,	dsci.[idModalidad]
	,	dsci.[modalidad]
	,	dsci.[idGrado]
	,	dsci.[codigoGrado]
	,	dsci.[descripcionGrado]
	,	dsci.[idParalelo]
	,	dsci.[paralelo]
	,	dsci.[idTurno]
	,	dsci.[turno]

	FROM dbo.DeceSeguimientoCasoIndividual dsci

	--AND dsci.idDeceSeguimientoCasoIndividual= 1
		FOR JSON PATH )

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END


--===================================================================================================
--========================Listar de SeguimientoCasoIndividualById  ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspDeceSeguimientoCasoIndividualByIdGet') IS NOT NULL
	DROP PROC uspDeceSeguimientoCasoIndividualByIdGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSeguimientoCasoIndividualByIdGet '', '{"id":3}'
CREATE PROC [dbo].[uspDeceSeguimientoCasoIndividualByIdGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT dsci.[idDeceSeguimientoCasoIndividual]
	,	CAST(dsci.fechaNacimiento as DATE) AS fechaNacimiento
	,	dsci.[curso]
	,	CAST(dsci.[fechaAperturaSeguimiento] as DATE) AS fechaAperturaSeguimiento
	,	dsci.[nombreRemitente]
	,	dsci.[nombreInstitucion]
	,	dsci.[accionesRealizadas]
	,	dsci.[acuerdos]
	,	dsci.[recomendacionesSugerencias]
	,	dsci.[codAlumno]
	,	dsci.[nombreAlumno]

	,	dsci.[idModalidad]
	,	dsci.[modalidad]
	,	dsci.[idGrado]
	,	dsci.[codigoGrado]
	,	dsci.[descripcionGrado]
	,	dsci.[idParalelo]
	,	dsci.[paralelo]
	,	dsci.[idTurno]
	,	dsci.[turno]
	
	FROM dbo.DeceSeguimientoCasoIndividual dsci
	
	WHERE dsci.idDeceSeguimientoCasoIndividual= @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS payload
END

-- ====================================Insert=========
GO
IF OBJECT_ID('uspDeceSeguimientoCasoIndividualInsert ') IS NOT NULL 
	DROP PROC uspDeceSeguimientoCasoIndividualInsert
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionInsert 0, 0, 0, 0
Create PROC uspDeceSeguimientoCasoIndividualInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	BEGIN TRAN 
			
		INSERT INTO dbo.DeceSeguimientoCasoIndividual(codAlumno, nombreAlumno, fechaNacimiento, curso, fechaAperturaSeguimiento, nombreRemitente, nombreInstitucion, accionesRealizadas, acuerdos, recomendacionesSugerencias, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
			SELECT di.codAlumno, di.nombreAlumno, CAST(di.fechaNacimiento AS DATE), di.curso, CAST(di.fechaAperturaSeguimiento AS DATE), di.nombreRemitente, di.nombreInstitucion,di.accionesRealizadas,di.acuerdos,di.recomendacionesSugerencias, @fechaHoy, @idSucursal, di.gestion, @idUsuario, @nombreUsuario,@idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
			FROM OPENJSON(@dataFormJson) 
			WITH (
				codAlumno					INT '$.codAlumno'
			,	nombreAlumno				VARCHAR(500)   '$.nombreAlumno'
			,	fechaNacimiento				VARCHAR(20) '$.fechaNacimiento'
			,	curso						VARCHAR(100)  '$.curso'
			,	fechaAperturaSeguimiento	VARCHAR(20) '$.fechaAperturaSeguimiento'
			,	nombreRemitente				VARCHAR(100)  '$.nombreRemitente'
			,	nombreInstitucion			VARCHAR(100)  '$.nombreInstitucion'
			,	accionesRealizadas			VARCHAR(1000)  '$.accionesRealizadas'
			,	acuerdos					VARCHAR(1000)  '$.acuerdos'
			,	recomendacionesSugerencias	VARCHAR(1000)  '$.recomendacionesSugerencias'
		
 			,	gestion					INT	'$.gestion	'
 			,	idModalidad				INT	'$.idModalidad'
 			,	modalidad				VARCHAR(100) '$.modalidad'
 			,	idGrado					INT	'$.idGrado'
 			,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 			,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 			,	idParalelo				INT	'$.idParalelo'
 			,	paralelo				VARCHAR(500) '$.paralelo'
			,	idTurno					INT	'$.idTurno'
			,	turno					VARCHAR(100) '$.turno'
			)
			AS di

			SET @id=@@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceSeguimientoCasoIndividual WHERE idDeceSeguimientoCasoIndividual = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN

	SELECT '1','Cambios guardado exitosamente','',@id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--==================================================================================================================

GO
IF OBJECT_ID('uspDeceSeguimientoCasoIndividualUpdate') IS NOT NULL
	DROP PROC uspDeceSeguimientoCasoIndividualUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSeguimientoCasoIndividualUpdate '','{"id":3}','{"idDeceSeguimientoCasoIndividual":3,"codAlumno":14374,"fechaNacimiento":"2007-06-14T00:00:00","curso":"Sexto de Básica","fechaAperturaSeguimiento":"2022-05-05T00:00:00","nombreRemitente":"Nose el nombre","nombreInstitucion":"Biblioteca","accionesRealizadas":"Asuntos varios","acuerdos":"no llevar los libros","recomendacionesSugerencias":"ninguna, que ere loco placencia","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSeguimientoCasoIndividualUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''


BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE dci
		
		SET 
			dci.codAlumno = dcj.codAlumno
		,	dci.nombreAlumno=dcj.nombreAlumno
		,   dci.fechaNacimiento = CAST (dcj.fechaNacimiento AS DATE)
		,   dci.curso = dcj.curso
		,   dci.fechaAperturaSeguimiento = CAST (dcj.fechaAperturaSeguimiento AS DATE)
		,   dci.nombreRemitente = dcj.nombreRemitente
		,   dci.nombreInstitucion = dcj.nombreInstitucion
		,   dci.accionesRealizadas = dcj.accionesRealizadas
		,   dci.acuerdos = dcj.acuerdos
		,   dci.recomendacionesSugerencias = dcj.recomendacionesSugerencias
				
 		,	dci.idModalidad		=  dcj.idModalidad					
 		,	dci.modalidad		=  dcj.modalidad				
 		,	dci.idGrado			=  dcj.idGrado						
 		,	dci.codigoGrado		=  dcj.codigoGrado					
 		,	dci.descripcionGrado	=  dcj.descripcionGrado		
 		,	dci.idParalelo		=  dcj.idParalelo					
 		,	dci.paralelo		=  dcj.paralelo				
		,	dci.idTurno			=  dcj.idTurno						
		,	dci.turno			=  dcj.turno	

		FROM OPENJSON(@dataFormJson) 
		WITH (
				idDeceSeguimientoCasoIndividual		INT '$.idDeceSeguimientoCasoIndividual'
			,	codAlumno							INT '$.codAlumno'
			,	nombreAlumno						VARCHAR(500)	'$.nombreAlumno'
			,	fechaNacimiento						VARCHAR(20) '$.fechaNacimiento'
			,	curso								VARCHAR(100)  '$.curso'
			,	fechaAperturaSeguimiento			VARCHAR(20) '$.fechaAperturaSeguimiento'
			,	nombreRemitente						VARCHAR(100)  '$.nombreRemitente'
			,	nombreInstitucion					VARCHAR(100)  '$.nombreInstitucion'
			,	accionesRealizadas					VARCHAR(1000)  '$.accionesRealizadas'
			,	acuerdos							VARCHAR(1000)  '$.acuerdos'
			,	recomendacionesSugerencias			VARCHAR(1000)  '$.recomendacionesSugerencias'

 			,	idModalidad				INT	'$.idModalidad'
 			,	modalidad				VARCHAR(100) '$.modalidad'
 			,	idGrado					INT	'$.idGrado'
 			,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 			,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 			,	idParalelo				INT	'$.idParalelo'
 			,	paralelo				VARCHAR(500) '$.paralelo'
			,	idTurno					INT	'$.idTurno'
			,	turno					VARCHAR(100) '$.turno'
		) as dcj
		join dbo.DeceSeguimientoCasoIndividual dci ON dci.idDeceSeguimientoCasoIndividual = dcj.idDeceSeguimientoCasoIndividual 
		WHERE dci.idDeceSeguimientoCasoIndividual = @id
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--==========================================================================================

GO
IF OBJECT_ID('uspDeceSeguimientoCasoIndividualDelete ') IS NOT NULL
	DROP PROC uspDeceSeguimientoCasoIndividualDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSeguimientoCasoIndividualDelete 0, 0, 0, 0
CREATE PROC uspDeceSeguimientoCasoIndividualDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
	BEGIN TRAN 

		 DELETE FROM  dbo.DeceSeguimientoCasoIndividual WHERE idDeceSeguimientoCasoIndividual = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceSeguimientoCasoIndividual WHERE idDeceSeguimientoCasoIndividual = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--============================================================================================================================================================================
--========================================================JONATHAN PROCEDURES=================================================================================================
--========================================================JONATHAN PROCEDURES=================================================================================================
--========================================================JONATHAN PROCEDURES=================================================================================================
--============================================================================================================================================================================


--alter table ErroresSP alter column errormessage varchar(2000) not null
--alter table ErroresSP alter column errorprocedure varchar(100) not null

--=========================================IntervencionSesionSeguimientoOpcion=========================================
GO
IF OBJECT_ID('[uspDeceIntervencionSesionSeguimientoOpcionGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionSesionSeguimientoOpcionGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionSesionSeguimientoOpcionGet 0, 0, 0, 0
Create PROC [dbo].[uspDeceIntervencionSesionSeguimientoOpcionGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
	SELECT @id=id FROM OPENJSON (@identifierFormJson) WITH(

		id INT '$.id'
)

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		tr.[idDeceIntervencionSesionSeguimientoOpcion]
	,	tr.[codigo]
	,	tr.[opcionTipo] 
	,	tr.[atributoName] 
	,	tr.[nombrePropiedad] 
	,	tr.[descripcion] 
	,	tr.[fechaRegistro] 
	,	tr.[estado]	
	,	CAST (di.[fechaInicioIntervencion] as DATE) AS fechaInicioIntervencion
	,	ISNULL(di.idDeceSesionSeguimiento,0)													AS [data.idDeceIntervencionSesionSeguimientoOpcion]
	,	CAST((CASE WHEN ISNULL(di.idDeceSesionSeguimiento,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	--,	ISNULL(di.descripcion,'')																				AS [data.descripcion]
	FROM dbo.DeceIntervencionSesionSeguimientoOpcion tr
	LEFT JOIN dbo.DeceSesionSeguimiento di ON di.idDeceIntervencionSesionSeguimientoOpcion = tr.idDeceIntervencionSesionSeguimientoOpcion
									AND di.idDeceSesionSeguimiento = @id
	FOR JSON Path ) AS payload
END
-- ===========================================Insert==

GO
IF OBJECT_ID('uspDeceIntervencionSesionSeguimientoOpcionInsert') IS NOT NULL
	DROP PROC uspDeceIntervencionSesionSeguimientoOpcionInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionSesionSeguimientoOpcionInsert 0, 0, 0, 0
CREATE PROC uspDeceIntervencionSesionSeguimientoOpcionInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
		/* EN CONSTRUCCION*/
		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceIntervencionSesionSeguimientoOpcion sd WHERE sd.idDeceIntervencionSesionSeguimientoOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY
BEGIN CATCH
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


GO
IF OBJECT_ID('uspDeceIntervencionSesionSeguimientoOpcionUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionSesionSeguimientoOpcionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionSesionSeguimientoOpcionUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionSesionSeguimientoOpcionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE dss
		
		SET dss.codigo= sj.codigo
		,	dss.opcionTipo= sj.opcionTipo
		,	dss.nombrePropiedad= sj.nombrePropiedad
		,	dss.descripcion= sj.descripcion
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionSesionSeguimientoOpcion	INT '$.idDeceIntervencionSesionSeguimientoOpcion'
		,	codigo										INT '$.codigo'
		,	opcionTipo									INT '$.opcionTipo'
		,	nombrePropiedad								VARCHAR(50) '$.nombrePropiedad'
		,	descripcion									VARCHAR(50) '$.descripcion'
		
		) as sj
		join dbo.DeceIntervencionSesionSeguimientoOpcion  dss ON dss.idDeceIntervencionSesionSeguimientoOpcion = sj.idDeceIntervencionSesionSeguimientoOpcion

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionSesionSeguimientoOpcion WHERE idDeceIntervencionSesionSeguimientoOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
			
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		


		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceIntervencionSesionSeguimientoOpcionDelete') IS NOT NULL
	DROP PROC uspDeceIntervencionSesionSeguimientoOpcionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionSesionSeguimientoOpcionDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionSesionSeguimientoOpcionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
 @id INT
,@gestion INT
,@idsucursal INT
,@idUsuario INT
,@idRol INT
,@message VARCHAR(500) = ''
,@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
	
	IF EXISTS (SELECT TOP 1 1 FROM dbo.DeceIntervencionSesionSeguimientoOpcion WHERE idDeceIntervencionSesionSeguimientoOpcion = @id)
		BEGIN 
			SET @message = 'Existe dependencia !Imposible Borrar!'
			GOTO CONTROL_ERROR
		END

	BEGIN TRAN 	
			
		DELETE FROM dbo.DeceIntervencionSesionSeguimientoOpcion WHERE idDeceIntervencionSesionSeguimientoOpcion = @id
			
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionSesionSeguimientoOpcion WHERE idDeceIntervencionSesionSeguimientoOpcion = @id)
			BEGIN 
				SET @message = 'Los cambios no se pudieron realizar (2)'
				GOTO CONTROL_ERROR
			END
				
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		
		


		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--======================================================DeceSesionSeguimiento ====================================================
GO
IF OBJECT_ID('uspDeceSesionSeguimientoGet ') IS NOT NULL 
	DROP PROC uspDeceSesionSeguimientoGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoGet 0, 0, 0, 0
CREATE PROC uspDeceSesionSeguimientoGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SET @value =(SELECT	
		dss.[idDeceSesionSeguimiento]
	,	dssop.[idDeceIntervencionSesionSeguimientoOpcion]
	,	dssop.[descripcion]
	,	dss.[codAlumno]
	,	dss.[nombreAlumno]
	,	dss.[curso]
	,	dss.[dificultadDetectada]  
	,	dss.[nombreProfesional] 
	,	CAST(dss.[fechaInicioIntervencion] as DATE) AS fechaInicioIntervencion
	,	dss.[idModalidad]
	,	dss.[modalidad]
	,	dss.[idGrado]
	,	dss.[codigoGrado]
	,	dss.[descripcionGrado]
	,	dss.[idParalelo]
	,	dss.[paralelo]
	,	dss.[idTurno]
	,	dss.[turno]

	FROM dbo.DeceSesionSeguimiento dss
	INNER JOIN DeceIntervencionSesionSeguimientoOpcion dssop ON dssop.idDeceIntervencionSesionSeguimientoOpcion = dss.idDeceIntervencionSesionSeguimientoOpcion
	FOR JSON PATH )

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
--select * from DeceIntervencionSesionSeguimientoOpcion
END
--=======================================================================================================================================================================
GO
IF OBJECT_ID('[uspDeceSesionSeguimientoByIdGet]') IS NOT NULL
	DROP PROC [uspDeceSesionSeguimientoByIdGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoByIdGet '', '{"id":4}'
CREATE PROC [dbo].[uspDeceSesionSeguimientoByIdGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,	@value VARCHAR(MAX) = NULL
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value =(SELECT 
		drc.[idDeceSesionSeguimiento]
	,	CAST(drc.[fechaInicioIntervencion] as DATE) AS fechaInicioIntervencion
	,	drc.[codAlumno]
	,	drc.[nombreAlumno]
	,	drc.[curso]
	,	drc.[dificultadDetectada] 
	,	drc.[nombreProfesional]
	,	drc.[idDeceIntervencionSesionSeguimientoOpcion]

	,	drc.[idModalidad]
	,	drc.[modalidad]
	,	drc.[idGrado]
	,	drc.[codigoGrado]
	,	drc.[descripcionGrado]
	,	drc.[idParalelo]
	,	drc.[paralelo]
	,	drc.[idTurno]
	,	drc.[turno]

	FROM dbo.DeceSesionSeguimiento drc
	WHERE drc.idDeceSesionSeguimiento= @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN

END


-- ===========================================Insert==================
GO
IF OBJECT_ID('uspDeceSesionSeguimientoInsert') IS NOT NULL
	DROP PROC uspDeceSesionSeguimientoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoInsert 0, 0, 0, 0
CREATE PROC uspDeceSesionSeguimientoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
		
		--select * from DeceIntervencionSesionSeguimientoOpcion

		INSERT INTO dbo.DeceSesionSeguimiento(idDeceIntervencionSesionSeguimientoOpcion, codAlumno, nombreAlumno, curso, dificultadDetectada, nombreProfesional, fechaInicioIntervencion, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT di.idDeceIntervencionSesionSeguimientoOpcion, di.codAlumno, di.nombreAlumno, di.curso, di.dificultadDetectada, di.nombreProfesional,CAST(di.fechaInicioIntervencion as DATE), @fechaHoy, @idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceIntervencionSesionSeguimientoOpcion	INT '$.idDeceIntervencionSesionSeguimientoOpcion'
		,	codAlumno									INT '$.codAlumno'
		,	nombreAlumno								VARCHAR(500) '$.nombreAlumno'
		,	curso										VARCHAR(100) '$.curso'
		,	dificultadDetectada							VARCHAR(100) '$.dificultadDetectada'
		,	nombreProfesional							VARCHAR(254) '$.nombreProfesional'
		,	fechaInicioIntervencion						VARCHAR(300) '$.fechaInicioIntervencion'

 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSesionSeguimiento sd WHERE sd.idDeceSesionSeguimiento    = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--uspDeceSesionSeguimientoInsert 'NULL','{"idDeceIntervencion":0,"idDeceIntervencionSesionSeguimientoOpcion":1,"codAlumno":1450,"curso": "Sexto A","dificultadDetectada":"sfgdfg","nombreProfesional","fechaInicioIntervencion":"2022-05-04",fechaRegistro:"0001-01-01T00:00:00"}'



GO
IF OBJECT_ID('uspDeceSesionSeguimientoUpdate') IS NOT NULL
	DROP PROC uspDeceSesionSeguimientoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoUpdate 0, 0, 0, 0
CREATE PROC uspDeceSesionSeguimientoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS
BEGIN 
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''


BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE ds
		
		SET
			ds.idDeceIntervencionSesionSeguimientoOpcion = dsj.idDeceIntervencionSesionSeguimientoOpcion
		,   ds.codAlumno = dsj.codAlumno
		,	ds.nombreAlumno=dsj.nombreAlumno
		,   ds.dificultadDetectada = dsj.dificultadDetectada
		,   ds.curso = dsj.curso
		,   ds.nombreProfesional = dsj.nombreProfesional
		,   ds.fechaInicioIntervencion = CAST(dsj.fechaInicioIntervencion AS DATE)
				
 		,	ds.idModalidad		=  dsj.idModalidad					
 		,	ds.modalidad		=  dsj.modalidad				
 		,	ds.idGrado			=  dsj.idGrado						
 		,	ds.codigoGrado		=  dsj.codigoGrado					
 		,	ds.descripcionGrado	=  dsj.descripcionGrado		
 		,	ds.idParalelo		=  dsj.idParalelo					
 		,	ds.paralelo			=  dsj.paralelo				
		,	ds.idTurno			=  dsj.idTurno						
		,	ds.turno			=  dsj.turno
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSesionSeguimiento						INT '$.idDeceSesionSeguimiento'
		,	idDeceIntervencionSesionSeguimientoOpcion	INT '$.idDeceIntervencionSesionSeguimientoOpcion'
		,	codAlumno									INT '$.codAlumno'
		,	nombreAlumno								VARCHAR(500) '$.nombreAlumno'
		,	curso										VARCHAR(100) '$.curso'
		,	dificultadDetectada							VARCHAR(100) '$.dificultadDetectada'
		,	nombreProfesional							VARCHAR(254) '$.nombreProfesional'
		,	fechaInicioIntervencion						VARCHAR(20)  '$.fechaInicioIntervencion'
		
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'

		) as dsj
		join dbo.DeceSesionSeguimiento  ds ON ds.idDeceSesionSeguimiento = dsj.idDeceSesionSeguimiento
		WHERE ds.idDeceSesionSeguimiento=@id

	COMMIT TRAN
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceSesionSeguimientoDelete ') IS NOT NULL 
	DROP PROC uspDeceSesionSeguimientoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoDelete 0, 0, 0, 0
CREATE PROC uspDeceSesionSeguimientoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
	@id INT
, 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	BEGIN TRAN
		DELETE FROM  dbo.DeceSesionSeguimientoDetalle WHERE idDeceSesionSeguimiento =@id

		DELETE FROM  dbo.DeceSesionSeguimiento WHERE idDeceSesionSeguimiento =@id
		
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceSesionSeguimiento WHERE idDeceSesionSeguimiento = @id)
			BEGIN 
				SET @message = 'Los cambios no se pudieron realizar (2)'
				GOTO CONTROL_ERROR
			END
		COMMIT TRAN
		
		SELECT '1' , 'Cambios guardado exitosamente' , '' ,@id as payload
		RETURN
END TRY 
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--======================================================LISTART====================================
GO
IF OBJECT_ID('uspDeceSesionSeguimientoDetalleGet ') IS NOT NULL 
	DROP PROC uspDeceSesionSeguimientoDetalleGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoDetalleGet 0, 0, 0, 0
CREATE PROC uspDeceSesionSeguimientoDetalleGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	SET @value = (SELECT	
		ssd.[idDeceSesionSeguimientoDetalle]
	,	ss.[idDeceSesionSeguimiento] 
	,	CAST(ssd.[fecha] as DATE) AS fecha   
	,	ssd.[areasTrabajadas] 
	,	ssd.[actividadesPlanificadas]
	,	ssd.[materialesUtilizar]
	,	ssd.[observaciones]
	,	ssd.[avances]
	FROM dbo.DeceSesionSeguimientoDetalle ssd
	INNER JOIN DeceSesionSeguimiento ss ON ss.idDeceSesionSeguimiento = ssd.idDeceSesionSeguimiento
	and ssd.idDeceSesionSeguimiento = @id
	FOR JSON PATH ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END
--========================================================================================================================================================================

--GO
--IF OBJECT_ID('[uspDeceSesionSeguimientoDetalleByIdGet]') IS NOT NULL
--	DROP PROC [uspDeceSesionSeguimientoDetealleByIdGet]
--GO
---- =============================================
---- Author:		Jefferson Mena
---- Create date: 13-04-2022 
---- Description:	
---- =============================================
---- uspDeceSesionSeguimientoDetealleByIdGet '', '{"id":4}'
--CREATE PROC [dbo].[uspDeceSesionSeguimientoDetealleByIdGet]
-- @authClientJson NVARCHAR(MAX) = NULL
--,@identifierFormJson NVARCHAR(MAX) = NULL
--AS 
--BEGIN 
--DECLARE
--@id INT

--	SELECT @id = id
--		FROM OPENJSON(@identifierFormJson) 
--		WITH (
--			id	INT    '$.id'
--		)

--	SELECT 
--		'1'
--	,	''
--	,	''
--	,	(SELECT 
--		drc.[idDeceSesionSeguimientoDetalle]	
--	,	drc.[idDeceSesionSeguimiento]
--	,	CAST(drc.[fecha] as DATE) AS fecha
--	,	drc.[areasTrabajadas]
--	,	drc.[actividadesPlanificadas] 
--	,	drc.[materialesUtilizar]
--	,	drc.[observaciones]
--	,	drc.[avances]
--	FROM dbo.DeceSesionSeguimientoDetalle drc WHERE drc.idDeceSesionSeguimientoDetalle= @id
--		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS payload
--END

--=====================================INSERT==========================================
GO
IF OBJECT_ID('uspDeceSesionSeguimientoDetalleInsert ') IS NOT NULL 
	DROP PROC uspDeceSesionSeguimientoDetalleInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoDetalleInsert '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}' , '{"idDeceSesionSeguimiento":1,"idDeceSesionSeguimientoDetalle":0,"fecha":"2022-07-10T00:00:00","areasTrabajadas":"asd","actividadesPlanificadas":"asd","materialesUtilizar":"asd","observaciones":"asda","avances":"sdgh","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSesionSeguimientoDetalleInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
print '1'
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT @id = idDeceSesionSeguimiento
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSesionSeguimiento	INT    '$.idDeceSesionSeguimiento'
		)
		print @idRol
	BEGIN TRAN 
		print @id	
		INSERT INTO dbo.DeceSesionSeguimientoDetalle([idDeceSesionSeguimiento] , [fecha], [areasTrabajadas], [actividadesPlanificadas], [materialesUtilizar], [observaciones], [avances],[fechaRegistro])
		SELECT @id,CAST (di.fecha AS DATE) , di.areasTrabajadas, di.actividadesPlanificadas, di.materialesUtilizar, di.observaciones,di.avances,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			fecha					VARCHAR(20) '$.fecha'
		,	areasTrabajadas			VARCHAR(300) '$.areasTrabajadas'
		,	actividadesPlanificadas VARCHAR(300) '$.actividadesPlanificadas'
		,	materialesUtilizar		VARCHAR(300) '$.materialesUtilizar'
		,	observaciones			VARCHAR(300) '$.observaciones'
		,	avances					VARCHAR(300) '$.avances'
		)AS di
		print '2'
		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceSesionSeguimientoDetalle sd WHERE sd.idDeceSesionSeguimientoDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END





GO
IF OBJECT_ID('uspDeceSesionSeguimientoDetalleUpdate') IS NOT NULL
	DROP PROC uspDeceSesionSeguimientoDetalleUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoDetalleUpdate '','21','{"idDeceSesionSeguimiento":21,"fecha":"2022-05-05T00:00:00","areasTrabajadas":"AAAAAAAAAAAA","actividadesPlanificadas":"AAAAAAAAAAAAAA","materialesUtilizar":"AAAAAAAAAAAAAAA","observaciones":"AAAAAAAAAAAAAAAAAAA","avances":"AAAAAAAAAAAAA","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSesionSeguimientoDetalleUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSesionSeguimientoDetalle INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE ds
		
		SET

		   ds.fecha = CAST(dsj.fecha AS DATE)
		,   ds.areasTrabajadas = dsj.areasTrabajadas
		,	ds.actividadesPlanificadas=dsj.actividadesPlanificadas
		,   ds.materialesUtilizar = dsj.materialesUtilizar
		,   ds.observaciones = dsj.observaciones
		,   ds.avances = dsj.avances
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
				idDeceSesionSeguimientoDetalle	INT '$.idDeceSesionSeguimientoDetalle'
			,	fecha							VARCHAR(20) '$.fecha'
			,	areasTrabajadas					VARCHAR(300) '$.areasTrabajadas'
			,	actividadesPlanificadas			VARCHAR(300) '$.actividadesPlanificadas'
			,	materialesUtilizar				VARCHAR(300) '$.materialesUtilizar'
			,	observaciones					VARCHAR(300) '$.observaciones'
			,	avances							VARCHAR(300) '$.avances'

		) as dsj

		join dbo.DeceSesionSeguimientoDetalle  ds ON ds.idDeceSesionSeguimientoDetalle = dsj.idDeceSesionSeguimientoDetalle
		WHERE ds.idDeceSesionSeguimiento=@id
	
		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH

	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--select * from DeceSesionSeguimiento


GO
IF OBJECT_ID('uspDeceSesionSeguimientoDetalleDelete ') IS NOT NULL
	DROP PROC uspDeceSesionSeguimientoDetalleDelete
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSesionSeguimientoDetalleDelete '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}','{"id":1}'
CREATE PROC uspDeceSesionSeguimientoDetalleDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,   @message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
			
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
		DELETE FROM dbo.DeceSesionSeguimientoDetalle WHERE idDeceSesionSeguimientoDetalle=@id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceSesionSeguimientoDetalle WHERE idDeceSesionSeguimientoDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--=================================LISTAR=====================================================================================================
GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteGet ') IS NOT NULL 
	DROP PROC uspDeceCompromisoRepresentanteGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteGet 0, 0, 0, 0
CREATE PROC uspDeceCompromisoRepresentanteGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SET @value =(SELECT	
		cr.[idDeceCompromisoRepresentante]
	,	cr.[codigo]
	,	cr.[codAlumno]   
	,	cr.[fechaCompromiso] 
	,	cr.[nombreRepresentante] --representante
	,	cr.[cedulaRepresentante]
	,	cr.[curso]
	,	cr.[docente]
	,	cr.[nombreAlumno]

	,	cr.[idModalidad]
	,	cr.[modalidad]
	,	cr.[idGrado]
	,	cr.[codigoGrado]
	,	cr.[descripcionGrado]
	,	cr.[idParalelo]
	,	cr.[paralelo]
	,	cr.[idTurno]
	,	cr.[turno]

	FROM dbo.DeceCompromisoRepresentante cr
	--and cr.idDeceCompromisoRepresentante = @id
	FOR JSON PATH )
	
	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END
 

--================================================================================================================================================
GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteGetById ') IS NOT NULL 
	DROP PROC uspDeceCompromisoRepresentanteGetById
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteGetById '', '{"id":18}'
CREATE PROC uspDeceCompromisoRepresentanteGetById
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	SET @value =(SELECT	
		dcr.[idDeceCompromisoRepresentante]
	,	dcr.[codigo]
	,	dcr.[codAlumno]
	,	dcr.[curso]
	,	dcr.[nombreRepresentante]  --representante
	,	dcr.[cedulaRepresentante]  
	,	dcr.[docente] 
	,	dcr.[nombreAlumno]
	,	CAST (dcr.[fechaCompromiso] AS DATE) as fechaCompromiso

	,	dcr.[idModalidad]
	,	dcr.[modalidad]
	,	dcr.[idGrado]
	,	dcr.[codigoGrado]
	,	dcr.[descripcionGrado]
	,	dcr.[idParalelo]
	,	dcr.[paralelo]
	,	dcr.[idTurno]
	,	dcr.[turno]

	FROM dbo.DeceCompromisoRepresentante dcr
	WHERE dcr.idDeceCompromisoRepresentante = @id
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER  ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
--select * from DeceCompromisoRepresentanteDetalle
END
GO

--==================================================================Insert========================================================================
GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteInsert ') IS NOT NULL 
	DROP PROC uspDeceCompromisoRepresentanteInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteInsert '','{"idDeceCompromisoRepresentante":0,"codigo":"12345","fechaCompromiso":"2022-06-10T00:00:00","representante":"PACO","cedulaRepresentante":"193456789","codAlumno":45678,"nombreAlumno":"JHON","curso":"Quinto B","detalle":[{"idDeceCompromisoRepresentanteDetalle":0,"idDeceCompromisoRepresentante":0,"descripcion":"dasd","fechaRegistro":"0001-01-01T00:00:00"}],"docente":"asd","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceCompromisoRepresentanteInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 

----select * from DeceCompromisoRepresentante 
			
		INSERT INTO dbo.DeceCompromisoRepresentante(codigo, fechaCompromiso, nombreRepresentante, cedulaRepresentante, codAlumno, nombreAlumno, curso, docente, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno )
		SELECT cr.codigo, CAST (cr.fechaCompromiso AS DATE) , cr.nombreRepresentante, cr.cedulaRepresentante, cr.codAlumno,cr.nombreAlumno, cr.curso, cr.docente ,@fechaHoy, @idSucursal, cr.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, cr.idModalidad, cr.modalidad, cr.idGrado, cr.codigoGrado, cr.descripcionGrado, cr.idParalelo, cr.paralelo, cr.idTurno, cr.turno
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo                  VARCHAR(50)  '$.codigo'
		,	fechaCompromiso			VARCHAR(300) '$.fechaCompromiso'
		,	nombreRepresentante		VARCHAR(100) '$.nombreRepresentante'
		,	cedulaRepresentante		VARCHAR(20)  '$.cedulaRepresentante'
		,	codAlumno				INT			 '$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	curso					VARCHAR(100) '$.curso'
		,	docente					VARCHAR(100) '$.docente'
		
 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		
		)AS cr

		SET @id =@@IDENTITY
		
		print @id

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceCompromisoRepresentante sd WHERE sd.idDeceCompromisoRepresentante = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios - o'
				GOTO CONTROL_ERROR
			END
			
		INSERT INTO dbo.DeceCompromisoRepresentanteDetalle (idDeceCompromisoRepresentante, descripcion, fechaRegistro)
		SELECT @id, cr2.descripcion, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.detalle') 
		WITH (
		descripcion	VARCHAR(300) '$.descripcion' 
		) AS cr2
		
	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY 
BEGIN CATCH
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
	
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




GO
/****** Object:  StoredProcedure [dbo].[uspDeceCompromisoRepresentanteUpdate]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceCompromisoRepresentanteUpdate') IS NOT NULL
	DROP PROC uspDeceCompromisoRepresentanteUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteUpdate '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}','{"id":1}','{"idDeceCompromisoRepresentante":1,"codigo":"2022-26131","fechaCompromiso":"2022-06-29T00:00:00","representante":null,"cedulaRepresentante":"gfdfhdjdfgdhfs","codAlumno":26131,"nombreAlumno":"HERNANDEZ CENTENO ELIANA VICTORIA","curso":"EDU.ABIE. Tercero de Básica \"A\"","detalle":[{"idDeceCompromisoRepresentanteDetalle":2,"idDeceCompromisoRepresentante":1,"descripcion":"xxxxxxxxxxxxxxxxx","fechaRegistro":"2022-06-29T00:00:00"},{"idDeceCompromisoRepresentanteDetalle":4,"idDeceCompromisoRepresentante":1,"descripcion":"zzzzzzzzzzzzzzzzzzzzzzzzzzzz","fechaRegistro":"2022-06-29T00:00:00"}],"docente":"hvbghjvhjvhjv,jhvjhvh","fechaRegistro":"0001-01-01T00:00:00","gestion":2021,"idModalidad":4,"modalidad":"Educación Abierta","idGrado":78,"codigoGrado":"3B","descripcionGrado":"Tercero de Básica","idParalelo":1,"paralelo":"A","idTurno":1,"turno":"Matutina"}'
CREATE PROC uspDeceCompromisoRepresentanteUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	print '0'
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
		print @id
	BEGIN TRAN
		print '1'

		UPDATE cru
		
		SET 
			cru.codigo				=	dcj.codigo
		,   cru.fechaCompromiso		=	CAST (dcj.fechaCompromiso AS DATE)
		,   cru.nombreRepresentante =	dcj.nombreRepresentante
		,   cru.cedulaRepresentante	=	dcj.cedulaRepresentante 
		,	cru.nombreAlumno		=	dcj.nombreAlumno
		,   cru.curso				=	dcj.curso
		,   cru.docente				=	dcj.docente
				
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceCompromisoRepresentante	INT '$.idDeceCompromisoRepresentante'
		,	codigo							VARCHAR(50)  '$.codigo'
		,	fechaCompromiso					VARCHAR(300) '$.fechaCompromiso'
		,	nombreRepresentante					VARCHAR(100) '$.nombreRepresentante'
		,	cedulaRepresentante				VARCHAR(20)  '$.cedulaRepresentante'
		,	nombreAlumno					VARCHAR(500) '$.nombreAlumno'
		,	curso							VARCHAR(100) '$.curso'
		,	docente							VARCHAR(100) '$.docente'



		) as dcj
		join dbo.DeceCompromisoRepresentante  cru ON cru.idDeceCompromisoRepresentante = @id
		--select * from DeceCompromisoRepresentanteDetalle
		WHERE cru.idDeceCompromisoRepresentante = @id
		print '2'
		DELETE dei FROM dbo.DeceCompromisoRepresentanteDetalle dei
		WHERE dei.idDeceCompromisoRepresentante = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.detalle') 
			WITH ( idDeceCompromisoRepresentanteDetalle	INT '$.idDeceCompromisoRepresentanteDetalle' )	AS di
			WHERE dei.idDeceCompromisoRepresentanteDetalle = di.idDeceCompromisoRepresentanteDetalle
		)
		
		INSERT INTO dbo.DeceCompromisoRepresentanteDetalle( idDeceCompromisoRepresentante, descripcion, fechaRegistro)
		SELECT @id, di.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.detalle') 
			WITH (
				idDeceCompromisoRepresentanteDetalle	INT '$.idDeceCompromisoRepresentanteDetalle',
				descripcion VARCHAR(500) '$.descripcion'
			)	AS di

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceCompromisoRepresentanteDetalle di2
			WHERE  di2.idDeceCompromisoRepresentante = @id
			AND di2.idDeceCompromisoRepresentanteDetalle = di.idDeceCompromisoRepresentanteDetalle
			)

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteDelete ') IS NOT NULL
	DROP PROC uspDeceCompromisoRepresentanteDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteDelete 0, 0, 0, 0
CREATE PROC uspDeceCompromisoRepresentanteDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''


BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	BEGIN TRAN

		 DELETE FROM  dbo.DeceCompromisoRepresentanteDetalle WHERE idDeceCompromisoRepresentante = @id

		 DELETE FROM  dbo.DeceCompromisoRepresentante WHERE idDeceCompromisoRepresentante = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceCompromisoRepresentante WHERE idDeceCompromisoRepresentante = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY 
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--=============================================LISTAR========================================

GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteDetalleGet ') IS NOT NULL 
	DROP PROC uspDeceCompromisoRepresentanteDetalleGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteDetalleGet '', '{"id":18}'
CREATE PROC uspDeceCompromisoRepresentanteDetalleGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	SET @value =(SELECT
		dcrd.[idDeceCompromisoRepresentanteDetalle]
	,	dcrd.[idDeceCompromisoRepresentante]
	,	dcrd.[descripcion]  
	,	CAST (dcrd.[fechaRegistro] AS DATE) as fechaRegistro
	FROM dbo.DeceCompromisoRepresentanteDetalle dcrd

	WHERE dcrd.idDeceCompromisoRepresentante = @id
	FOR JSON PATH ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
--select * from dbo.DeceCompromisoRepresentanteDetalle
END



--===============================================================================================

GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteDetalleInsert ') IS NOT NULL 
	DROP PROC uspDeceCompromisoRepresentanteDetalleInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
CREATE PROC uspDeceCompromisoRepresentanteDetalleInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
			
		INSERT INTO dbo.DeceCompromisoRepresentanteDetalle(idDeceCompromisoRepresentante, descripcion, fechaRegistro)
		SELECT cr.idDeceCompromisoRepresentante, cr.descripcion,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceCompromisoRepresentante			INT '$.idDeceCompromisoRepresentante'
		,	descripcion								VARCHAR(300) '$.descripcion'
		)AS cr

		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceCompromisoRepresentanteDetalle sd WHERE sd.idDeceCompromisoRepresentanteDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceCompromisoRepresentanteDetalleUpdate]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceCompromisoRepresentanteDetalleUpdate') IS NOT NULL
	DROP PROC uspDeceCompromisoRepresentanteDetalleUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteDetalleUpdate 0, 0, 0, 0
CREATE PROC uspDeceCompromisoRepresentanteDetalleUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET crdu.idDeceCompromisoRepresentante=dcj.idDeceCompromisoRepresentante
		,   crdu.descripcion=dcj.descripcion 
		

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceCompromisoRepresentanteDetalle	INT  '$.idDeceCompromisoRepresentanteDetalle'		
		,	idDeceCompromisoRepresentante			INT '$.idDeceCompromisoRepresentante'
		,	descripcion								VARCHAR(300) '$.descripcion'
		) as dcj
		join dbo.DeceCompromisoRepresentanteDetalle  crdu ON crdu.idDeceCompromisoRepresentanteDetalle = dcj.idDeceCompromisoRepresentanteDetalle

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceCompromisoRepresentanteDetalle WHERE idDeceCompromisoRepresentanteDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceCompromisoRepresentanteDetalleDelete]   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('uspDeceCompromisoRepresentanteDetalleDelete ') IS NOT NULL
	DROP PROC uspDeceCompromisoRepresentanteDetalleDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceCompromisoRepresentanteDetalleDelete 0, 0, 0, 0
CREATE PROC uspDeceCompromisoRepresentanteDetalleDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceCompromisoRepresentanteDetalle WHERE idDeceCompromisoRepresentanteDetalle = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceCompromisoRepresentanteDetalle WHERE idDeceCompromisoRepresentanteDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--=================================================LISTAR==============================================================
GO
IF OBJECT_ID('uspDeceIntervencionGet ') IS NOT NULL 
	DROP PROC uspDeceIntervencionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionGet '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}', '{"id":13}'
CREATE PROC uspDeceIntervencionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT 
,@value VARCHAR(MAX)

SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

if(@id=0)
	BEGIN
		SET @value=(SELECT 	
			di.[idDeceIntervencion]
		,	dssop.[idDeceIntervencionSesionSeguimientoOpcion]
		,	dssop.[descripcion]
		,	idd.[destinatario] 
		,	CAST(di.[fechaRegistro] as DATE) AS fechaRegistro
		FROM dbo.DeceIntervencion di
		INNER JOIN DeceIntervencionSesionSeguimientoOpcion dssop ON dssop.idDeceIntervencionSesionSeguimientoOpcion = di.idDeceIntervencionSesionSeguimientoOpcion
		LEFT JOIN DeceIntervencionDestinatario idd on idd.idDeceIntervencion=di.idDeceIntervencion 

			FOR JSON PATH )

		IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

		SELECT '1',	'',	'',@value AS payload
		RETURN
	END
ELSE
		BEGIN
		SET @value=(SELECT 	
			di.[idDeceIntervencion]
		,	di.[codAlumno]
		,	di.[idModalidad]
		,	di.[modalidad]
		,	di.[idGrado]
		,	di.[codigoGrado]
		,	di.[descripcionGrado]
		,	di.[idParalelo]
		,	di.[paralelo]
		,	di.[idTurno]
		,	di.[turno]
		,	di.[gestion]
		FROM dbo.DeceIntervencion di
		WHERE di.idDeceIntervencion =@id

			FOR JSON PATH,WITHOUT_ARRAY_WRAPPER )

		IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

		SELECT '1',	'',	'',@value AS payload
		RETURN
	END
END
GO
--===============================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionOpcionGet ') IS NOT NULL 
	DROP PROC uspDeceIntervencionOpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionOpcionGet 0, 0, 0, 0
CREATE PROC uspDeceIntervencionOpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
	SELECT @id=id 
	FROM OPENJSON (@identifierFormJson) WITH(

		id INT '$.id'
		)	
	
	SELECT 
		'1'
	,	''
	,	''

	,(SELECT 
		tr.[idDeceIntervencionSesionSeguimientoOpcion]
	,	tr.[codigo]
	,	tr.[opcionTipo] 
	,	tr.[atributoName] 
	,	tr.[nombrePropiedad] 
	,	tr.[descripcion] 
	,	tr.[estado] 
	,	di.[idDeceIntervencion]  
	,	di.[fechaRegistro] 
	,	ISNULL(di.idDeceIntervencion,0)													AS [data.idDeceIntervencionSesionSeguimientoOpcion]
	,	CAST((CASE WHEN ISNULL(di.idDeceIntervencion,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	--,	ISNULL(di.descripcion,'')																				AS [data.descripcion]
	FROM dbo.DeceIntervencionSesionSeguimientoOpcion tr
	LEFT JOIN dbo.DeceIntervencion di ON di.idDeceIntervencionSesionSeguimientoOpcion = tr.idDeceIntervencionSesionSeguimientoOpcion
									AND di.idDeceIntervencion = @id
	FOR JSON Path ) AS payload
END
--===============================================================================================================================================================================
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('uspDeceIntervencionInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionInsert
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionInsert '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}','{"idDeceIntervencion":0,"idDeceIntervencionSesionSeguimientoOpcion":2,"ao":[{"idDeceIntervencionAreaOpcion":1,"codigo":1,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"cognitivo","descripcion":"Cognitivo","fechaRegistro":"0001-01-01T00:00:00","estado":false}],"riesgo":[{"idDeceIntervencionRiesgoIdentificado":0,"idDeceIntervencion":0,"descripcion":"asd","fechaRegistro":"0001-01-01T00:00:00"}],"dest":[{"idDeceIntervencionDestinatario":0,"idDeceIntervencion":0,"destinatario":"GALINDO CELI ARIHANA REBECA","fechaRegistro":"0001-01-01T00:00:00"}],"fechaRegistro":"0001-01-01T00:00:00","codAlumno":null,"gestion":2021,"idModalidad":1,"modalidad":"Educación Regular","idGrado":4,"codigoGrado":"1B","descripcionGrado":"Primero de Básica","idParalelo":1,"paralelo":"A","idTurno":1,"turno":"Matutina"}'
CREATE PROC uspDeceIntervencionInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
		 print @nombreUsuario
		INSERT INTO dbo.DeceIntervencion(idDeceIntervencionSesionSeguimientoOpcion, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno, codAlumno, nombreAlumno, fechaRegistro)
		SELECT di.idDeceIntervencionSesionSeguimientoOpcion,@idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol,di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno,di.codAlumno,'columnaCambiar', @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceIntervencionSesionSeguimientoOpcion	INT '$.idDeceIntervencionSesionSeguimientoOpcion'
		,	codAlumno				INT	'$.codAlumno'
 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(100) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		) AS di
		 print '3'
		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceIntervencion sd WHERE sd.idDeceIntervencion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		 print '4'	
		INSERT INTO dbo.DeceIntervencionArea(idDeceIntervencion, idDeceIntervencionAreaOpcion, descripcion, fechaRegistro)
		
			SELECT @id,di2.idDeceIntervencionAreaOpcion, '' , @fechaHoy
			FROM OPENJSON (@dataFormJson, '$.ao')
			WITH(

				idDeceIntervencionAreaOpcion INT '$.idDeceIntervencionAreaOpcion'
			
			) AS di2
		 print '5'	
		INSERT INTO dbo.DeceIntervencionRiesgoIdentificado(idDeceIntervencion, descripcion, fechaRegistro)
		
			SELECT @id,di3.descripcion, @fechaHoy
			FROM OPENJSON (@dataFormJson, '$.riesgo')
			WITH(

				descripcion VARCHAR(300) '$.descripcion'
			
			) AS di3
			

			INSERT INTO dbo.DeceIntervencionDestinatario(idDeceIntervencion, destinatario, fechaRegistro)
			SELECT @id,di4.destinatario, @fechaHoy
			FROM OPENJSON (@dataFormJson, '$.dest')
			WITH(
				destinatario VARCHAR(100) '$.destinatario'
			) AS di4
	 print '6'
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		
	

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
--select * from DeceIntervencion
---uspDeceIntervencionInsert NULL,'{"idDeceIntervencion":0,"idDeceIntervencionSesionSeguimientoOpcion":"1","destinatario":"XD",fechaRegistro:"0001-01-01T00:00:00"}'

GO
IF OBJECT_ID('uspDeceIntervencionUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionUpdate '{"codUsuario":"JsonMC","contrasena":"b6f826977cada3dec214d0451bb2e740","gestion":0,"idSucursal":1025,"idUsuario":1,"nombreUsuario":"Jefferson Mena","idRol":1,"nombreRol":"ADMIN"}', '{"id":12}','{"idDeceIntervencion":12,"idDeceIntervencionSesionSeguimientoOpcion":1,"ao":[{"idDeceIntervencionAreaOpcion":1,"codigo":1,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"cognitivo","descripcion":"Cognitivo","fechaRegistro":"0001-01-01T00:00:00","estado":false}],"riesgo":[{"idDeceIntervencionRiesgoIdentificado":1,"idDeceIntervencion":12,"descripcion":"dasd","fechaRegistro":"0001-01-01T00:00:00"}],"dest":[{"idDeceIntervencionDestinatario":1,"idDeceIntervencion":12,"destinatario":"GALINDO CELI ARIHANA REBECA","fechaRegistro":"0001-01-01T00:00:00"},{"idDeceIntervencionDestinatario":0,"idDeceIntervencion":0,"destinatario":"DS","fechaRegistro":"0001-01-01T00:00:00"}],"fechaRegistro":"0001-01-01T00:00:00","codAlumno":26306,"gestion":2021,"idModalidad":1,"modalidad":"Educación Regular","idGrado":4,"codigoGrado":"1B","descripcionGrado":"Primero de Básica","idParalelo":1,"paralelo":"A","idTurno":1,"turno":"Matutina"}'
CREATE PROC uspDeceIntervencionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
	BEGIN TRAN
		
		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencionSesionSeguimientoOpcion = dcj.idDeceIntervencionSesionSeguimientoOpcion
		
		
		FROM OPENJSON(@dataFormJson)	
		WITH (
			idDeceIntervencion							INT '$.idDeceIntervencion'
		,	idDeceIntervencionSesionSeguimientoOpcion	INT '$.idDeceIntervencionSesionSeguimientoOpcion'	
		) as dcj
		join dbo.DeceIntervencion  crdu ON crdu.idDeceIntervencion = dcj.idDeceIntervencion
		WHERE crdu.idDeceIntervencion = @id
		 
		DELETE dei FROM dbo.DeceIntervencionDestinatario dei
		WHERE dei.idDeceIntervencion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.dest') 
			WITH ( idDeceIntervencionDestinatario	INT '$.idDeceIntervencionDestinatario' )	AS di
			WHERE dei.idDeceIntervencionDestinatario = di.idDeceIntervencionDestinatario
		)

		--select * from DeceIntervencion
		INSERT INTO dbo.DeceIntervencionDestinatario( idDeceIntervencion, destinatario, fechaRegistro)
		SELECT @id, di.destinatario, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.dest') 
			WITH (
				idDeceIntervencionDestinatario INT '$.idDeceIntervencionDestinatario'
			,	destinatario VARCHAR(500) '$.destinatario'
			)	AS di

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceIntervencionDestinatario di2
			WHERE  di2.idDeceIntervencion = @id
			AND di2.idDeceIntervencionDestinatario = di.idDeceIntervencionDestinatario
			)


		DELETE iri FROM dbo.DeceIntervencionRiesgoIdentificado iri
		WHERE iri.idDeceIntervencion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.riesgo') 
			WITH ( idDeceIntervencionRiesgoIdentificado	INT '$.idDeceIntervencionRiesgoIdentificado' )	AS ri
			WHERE iri.idDeceIntervencionRiesgoIdentificado = ri.idDeceIntervencionRiesgoIdentificado
		)

		--select * from DeceIntervencionDestinatario
		INSERT INTO dbo.DeceIntervencionRiesgoIdentificado( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT @id, ri.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.riesgo') 
			WITH (
				idDeceIntervencionRiesgoIdentificado INT '$.idDeceIntervencionRiesgoIdentificado'
			,	descripcion VARCHAR(500) '$.descripcion'
			)	AS ri

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceIntervencionRiesgoIdentificado iri
			WHERE  iri.idDeceIntervencion = @id
			AND iri.idDeceIntervencionRiesgoIdentificado = ri.idDeceIntervencionRiesgoIdentificado
			)


		DELETE iar FROM dbo.DeceIntervencionArea iar
		WHERE iar.idDeceIntervencion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.ao') 
			WITH ( idDeceIntervencionAreaOpcion	INT '$.idDeceIntervencionAreaOpcion' )	AS ira
			WHERE iar.idDeceIntervencionAreaOpcion = ira.idDeceIntervencionAreaOpcion
		)
		--select * from DeceIntervencionArea
		INSERT INTO dbo.DeceIntervencionArea( idDeceIntervencion,idDeceIntervencionAreaOpcion, descripcion, fechaRegistro)
		SELECT @id,ira.idDeceIntervencionAreaOpcion,'', @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.ao') 
			WITH (
				idDeceIntervencionArea		INT	'$.idDeceIntervencionArea'
			,	idDeceIntervencionAreaOpcion INT '$.idDeceIntervencionAreaOpcion'
			)	AS ira

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceIntervencionArea ia
			WHERE  ia.idDeceIntervencion = @id
			AND ia.idDeceIntervencionAreaOpcion = ira.idDeceIntervencionAreaOpcion
			)

			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionDelete '','{"id":1}'
CREATE PROC uspDeceIntervencionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	BEGIN TRAN

		DELETE ac FROM DeceIntervencionAccionEstrategia ac INNER JOIN DeceIntervencionObjetivoEspecifico oe
				ON oe.idDeceIntervencionObjetivoEspecifico = ac.idDeceIntervencionObjetivoEspecifico
				INNER JOIN DeceIntervencionObjetivoGeneral og on og.idDeceIntervencionObjetivoGeneral=oe.idDeceIntervencionObjetivoGeneral
				WHERE og.idDeceIntervencion=@id

		DELETE oe2 FROM DeceIntervencionObjetivoEspecifico oe2 INNER JOIN DeceIntervencionObjetivoGeneral og2
				ON oe2.idDeceIntervencionObjetivoGeneral= og2.idDeceIntervencionObjetivoGeneral
				WHERE og2.idDeceIntervencion=@id 

		DELETE ogf FROM DeceIntervencionObjetivoGeneral ogf WHERE ogf.idDeceIntervencion=@id
	
		DELETE re FROM DeceIntervencionResultadoObtenido re WHERE re.idDeceIntervencion=@id

		DELETE re FROM DeceIntervencionObsRecomendacion re WHERE re.idDeceIntervencion=@id

		DELETE re FROM DeceIntervencionArea re WHERE re.idDeceIntervencion=@id

		DELETE re FROM DeceIntervencionDestinatario re WHERE re.idDeceIntervencion=@id

		DELETE re FROM DeceIntervencionRiesgoIdentificado re WHERE re.idDeceIntervencion=@id

		DELETE re FROM DeceIntervencion re WHERE re.idDeceIntervencion=@id
		
				
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--==============================================LISTAR=========================================
GO
IF OBJECT_ID('[uspDeceIntervencionAccionEstrategiaGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionAccionEstrategiaGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionAccionEstrategiaGet] '', '{"id":5}'
CREATE PROC [dbo].[uspDeceIntervencionAccionEstrategiaGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)


set @value = (SELECT drc.[idDeceIntervencionAccionEstrategia]
	,	ob.[idDeceIntervencionObjetivoGeneral]
	,	drc.[idDeceIntervencionObjetivoEspecifico]
	,	drc.[acciones]
	,	drc.[responsable]
	FROM dbo.DeceIntervencionAccionEstrategia drc
	INNER JOIN dbo.DeceIntervencionObjetivoEspecifico oe ON oe.idDeceIntervencionObjetivoEspecifico= drc.idDeceIntervencionObjetivoEspecifico
	INNER JOIN dbo.DeceIntervencionObjetivoGeneral ob ON ob.idDeceIntervencionObjetivoGeneral= oe.idDeceIntervencionObjetivoGeneral
	WHERE ob.idDeceIntervencion= @id
	FOR JSON PATH )


	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

	SELECT 
		'1',	'',	'',	@value AS payload
	RETURN
END


--=============================================================================================
GO
/****** Object:  StoredProcedure [dbo].[uspDeceIntervencionAccionEstrategiaInsert] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('uspDeceIntervencionAccionEstrategiaInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionAccionEstrategiaInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAccionEstrategiaInsert ' ','{"idDeceIntervencionAccionEstrategia":0,"idDeceIntervencionObjetivoEspecifico":35,"descripcion":"QQQQQQQQQQ","responsable":"QQQQQQ","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceIntervencionAccionEstrategiaInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
	
		INSERT INTO dbo.DeceIntervencionAccionEstrategia(idDeceIntervencionObjetivoEspecifico, acciones, responsable, fechaRegistro )
		SELECT  cr.idDeceIntervencionObjetivoEspecifico, cr.descripcion, cr.responsable, @fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionObjetivoEspecifico	INT '$.idDeceIntervencionObjetivoEspecifico'
		,	descripcion								VARCHAR(100) '$.descripcion'
		,	responsable								VARCHAR(100) '$.responsable'
		)AS cr
		
		SET @id =@@IDENTITY
		print '1'
		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionAccionEstrategia sd WHERE sd.idDeceIntervencionAccionEstrategia = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN
	print '2'
	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionAccionEstrategiaUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionAccionEstrategiaUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAccionEstrategiaUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAccionEstrategiaUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN
	
		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencionObjetivoEspecifico = dcj.idDeceIntervencionObjetivoEspecifico
		,	crdu.acciones	=	dcj.acciones 
		,   crdu.responsable	=	dcj.responsable 

		FROM OPENJSON(@dataFormJson) 
		WITH (			
			idDeceIntervencionAccionEstrategia		INT '$.idDeceIntervencionAccionEstrategia'
		,	idDeceIntervencionObjetivoEspecifico	INT '$.idDeceIntervencionObjetivoEspecifico'
		,	acciones								VARCHAR(100) '$.acciones'
		,	responsable								VARCHAR(100) '$.responsable'
		) as dcj
		join dbo.DeceIntervencionAccionEstrategia  crdu ON crdu.idDeceIntervencionAccionEstrategia = dcj.idDeceIntervencionAccionEstrategia
		
		
		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionAccionEstrategia   WHERE idDeceIntervencionAccionEstrategia = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionAccionEstrategiaDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionAccionEstrategiaDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAccionEstrategiaDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAccionEstrategiaDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionAccionEstrategia WHERE idDeceIntervencionAccionEstrategia = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionAccionEstrategia WHERE idDeceIntervencionAccionEstrategia = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
--=============================================================LISTAR========================================
GO
IF OBJECT_ID('[uspDeceIntervencionAreaGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionAreaGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaGet 0, 0, 0, 0
Create PROC [dbo].[uspDeceIntervencionAreaGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
	SELECT @id=id FROM OPENJSON (@identifierFormJson) WITH(

		id INT '$.id'
)

	SELECT 
		'1'
	,	''
	,	''
	,(SELECT 
		iaop.[idDeceIntervencionAreaOpcion]
	,	iaop.[codigo]
	,	iaop.[opcionTipo]  
	,	iaop.[atributoName] 
	,	iaop.[nombrePropiedad]
	,	iaop.[descripcion]
	,	ISNULL(ia.idDeceIntervencionArea,0)												AS [data.idDeceIntervencionArea]
	,	CAST((CASE WHEN ISNULL(ia.idDeceIntervencionArea,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(ia.descripcion,'')																		AS [data.descripcion]
	
	FROM dbo.DeceIntervencionAreaOpcion iaop
	LEFT JOIN dbo.DeceIntervencionArea ia ON ia.idDeceIntervencionAreaOpcion = iaop.idDeceIntervencionAreaOpcion
										AND ia.idDeceIntervencion=@id

	FOR JSON PATH ) AS payload
END

--==============================================================================================================


GO
IF OBJECT_ID('uspDeceIntervencionAreaInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionAreaInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
CREATE PROC uspDeceIntervencionAreaInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		INSERT INTO dbo.DeceIntervencionArea(idDeceIntervencion, idDeceIntervencionAreaOpcion, descripcion, fechaRegistro )
		SELECT  cr.idDeceIntervencion,cr.idDeceIntervencionAreaOpcion, cr.descripcion,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencion				INT '$.idDeceIntervencion'
		,	idDeceIntervencionAreaOpcion	INT '$.idDeceIntervencionAreaOpcion'
		,	descripcion						VARCHAR(100) '$.descripcion'
		)AS cr

		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionArea sd WHERE sd.idDeceIntervencionArea = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




GO
IF OBJECT_ID('uspDeceIntervencionAreaUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionAreaUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAreaUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencion=dcj.idDeceIntervencion
		,   crdu.idDeceIntervencionAreaOpcion=dcj.idDeceIntervencionAreaOpcion 
		,   crdu.descripcion=dcj.descripcion 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionArea			INT '$.idDeceIntervencionArea'
		,	idDeceIntervencion				INT '$.idDeceIntervencion'
		,	idDeceIntervencionAreaOpcion	INT '$.idDeceIntervencionAreaOpcion'
		,	descripcion						VARCHAR(100) '$.descripcion'
		) as dcj
		join dbo.DeceIntervencionArea  crdu ON crdu.idDeceIntervencionArea = dcj.idDeceIntervencionArea

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionArea   WHERE idDeceIntervencionArea = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceIntervencionAreaDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionAreaDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAreaDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionArea WHERE idDeceIntervencionArea = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionArea WHERE idDeceIntervencionArea = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--=====================================================LISTAR========================================
GO
IF OBJECT_ID('uspDeceIntervencionAreaOpcionGet ') IS NOT NULL 
	DROP PROC uspDeceIntervencionAreaOpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaOpcionGet 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAreaOpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT = 0

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT 
		iaop.[idDeceIntervencionAreaOpcion]
	,	iaop.[codigo]
	,	iaop.[opcionTipo]  
	,	iaop.[atributoName] 
	,	iaop.[nombrePropiedad]
	,	iaop.[descripcion]
	,	ISNULL(ia.idDeceIntervencionArea,0)												AS [data.idDeceIntervencionArea]
	,	CAST((CASE WHEN ISNULL(ia.idDeceIntervencionArea,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(ia.descripcion,'')																		AS [data.descripcion]
	
	FROM dbo.DeceIntervencionAreaOpcion iaop
	LEFT JOIN dbo.DeceIntervencionArea ia ON ia.idDeceIntervencionAreaOpcion = iaop.idDeceIntervencionAreaOpcion
										AND ia.idDeceIntervencion=0

	FOR JSON PATH ) AS payload
END


--===================================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionAreaOpcionInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionAreaOpcionInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
CREATE PROC uspDeceIntervencionAreaOpcionInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		INSERT INTO dbo.DeceIntervencionAreaOpcion(codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
		SELECT  cr.codigo,cr.opcionTipo, cr.atributoName,cr.nombrePropiedad,cr.descripcion,@fechaHoy,'1'
		FROM OPENJSON(@dataFormJson) 
		WITH (
			codigo				INT '$.codigo'
		,	opcionTipo			INT '$.opcionTipo'
		,	atributoName		VARCHAR(50) '$.atributoName'
		,	nombrePropiedad		VARCHAR(50) '$.nombrePropiedad'
		,	descripcion			VARCHAR(50) '$.descripcion'
		)AS cr

		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionAreaOpcion sd WHERE sd.idDeceIntervencionAreaOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionAreaOpcionUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionAreaOpcionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaOpcionUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAreaOpcionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.codigo=dcj.codigo
		,   crdu.opcionTipo=dcj.opcionTipo 
		,   crdu.atributoName=dcj.atributoName
		,   crdu.nombrePropiedad=dcj.nombrePropiedad
		,   crdu.descripcion=dcj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionAreaOpcion    INT '$.idDeceIntervencionAreaOpcion'
		,	codigo							INT '$.codigo'
		,	opcionTipo						INT '$.opcionTipo'
		,	atributoName					VARCHAR(50) '$.atributoName'
		,	nombrePropiedad					VARCHAR(50) '$.nombrePropiedad'
		,	descripcion						VARCHAR(50) '$.descripcion'
		) as dcj
		join dbo.DeceIntervencionAreaOpcion  crdu ON crdu.idDeceIntervencionAreaOpcion = dcj.idDeceIntervencionAreaOpcion

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionAreaOpcion   WHERE idDeceIntervencionAreaOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

GO
IF OBJECT_ID('uspDeceIntervencionAreaOpcionDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionAreaOpcionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionAreaOpcionDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionAreaOpcionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionAreaOpcion WHERE idDeceIntervencionAreaOpcion = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionAreaOpcion WHERE idDeceIntervencionAreaOpcion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--=======================LISTAR=============================================================
GO
IF OBJECT_ID('[uspDeceIntervencionDestinatarioGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionDestinatarioGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionDestinatarioGet] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceIntervencionDestinatarioGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
set @value=(SELECT drc.[idDeceIntervencionDestinatario]
	,	drc.[idDeceIntervencion]
	,	drc.[destinatario]
	FROM dbo.DeceIntervencionDestinatario drc
	
	WHERE drc.idDeceIntervencion= @id
		FOR JSON PATH )
	
	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--========================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionDestinatarioInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionDestinatarioInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
CREATE PROC uspDeceIntervencionDestinatarioInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		INSERT INTO dbo.DeceIntervencionDestinatario(idDeceIntervencion, destinatario, fechaRegistro )
		SELECT  cr.idDeceIntervencion,cr.destinatario,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencion		INT '$.idDeceIntervencion'
		,	destinatario			VARCHAR(100) '$.destinatario'
		)AS cr

		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionDestinatario sd WHERE sd.idDeceIntervencionDestinatario = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceIntervencionDestinatarioUpdate]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceIntervencionDestinatarioUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionDestinatarioUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionDestinatarioUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionDestinatarioUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencion=dcj.idDeceIntervencion
		,   crdu.destinatario=dcj.destinatario 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionDestinatario	INT '$.idDeceIntervencionDestinatario'
		,	idDeceIntervencion				INT '$.idDeceIntervencion'
		,	destinatario					VARCHAR(100) '$.destinatario'
		) as dcj
		join dbo.DeceIntervencionDestinatario  crdu ON crdu.idDeceIntervencionDestinatario = dcj.idDeceIntervencionDestinatario

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionDestinatario   WHERE idDeceIntervencionDestinatario = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceIntervencionDestinatarioDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionDestinatarioDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionDestinatarioDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionDestinatarioDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionDestinatario WHERE idDeceIntervencionDestinatario = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionDestinatario WHERE idDeceIntervencionDestinatario = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--===================================LISTAR====================================
GO
IF OBJECT_ID('[uspDeceIntervencionObjetivoEspecificoGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionObjetivoEspecificoGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [[uspDeceIntervencionObjetivoEspecificoGet]] '', '{"id":5}'
CREATE PROC [dbo].[uspDeceIntervencionObjetivoEspecificoGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)


set @value = (SELECT drc.[idDeceIntervencionObjetivoGeneral]
	,	drc.[idDeceIntervencionObjetivoEspecifico]
	,	drc.[objEspecifico]
	FROM dbo.DeceIntervencionObjetivoEspecifico drc
	INNER JOIN dbo.DeceIntervencionObjetivoGeneral ob ON ob.idDeceIntervencionObjetivoGeneral= drc.idDeceIntervencionObjetivoGeneral
	WHERE ob.idDeceIntervencion= @id
	FOR JSON PATH )


	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--============================================================================
GO
IF OBJECT_ID('uspDeceIntervencionObjetivoEspecificoInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionObjetivoEspecificoInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
CREATE PROC uspDeceIntervencionObjetivoEspecificoInsert
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN 
		INSERT INTO dbo.DeceIntervencionObjetivoEspecifico( idDeceIntervencionObjetivoGeneral, objEspecifico, fechaRegistro )
		SELECT  cr.idDeceIntervencionObjetivoGeneral,cr.descripcion,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionObjetivoGeneral	INT '$.idDeceIntervencionObjetivoGeneral'
		,	descripcion							VARCHAR(300) '$.descripcion'
		)AS cr

		SET @id =@@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionObjetivoEspecifico sd WHERE sd.idDeceIntervencionObjetivoEspecifico = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		
		INSERT INTO dbo.DeceIntervencionAccionEstrategia( idDeceIntervencionObjetivoEspecifico, acciones, responsable, fechaRegistro )
		VALUES(  @id,'ACCIONES/ESTRATEGIAS','RESPONSABLE',@fechaHoy)

	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	

	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceIntervencionObjetivoEspecificoUpdate]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceIntervencionObjetivoEspecificoUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionObjetivoEspecificoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObjetivoEspecificoUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionObjetivoEspecificoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencionObjetivoGeneral=dcj.idDeceIntervencionObjetivoGeneral
		,   crdu.objEspecifico=dcj.objEspecifico 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionObjetivoEspecifico	INT '$.idDeceIntervencionObjetivoEspecifico'
		,	idDeceIntervencionObjetivoGeneral		INT '$.idDeceIntervencionObjetivoGeneral'
		,	objEspecifico								VARCHAR(300) '$.objEspecifico'
		) as dcj
		join dbo.DeceIntervencionObjetivoEspecifico  crdu ON crdu.idDeceIntervencionObjetivoEspecifico = dcj.idDeceIntervencionObjetivoEspecifico

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionObjetivoEspecifico   WHERE idDeceIntervencionObjetivoEspecifico = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceIntervencionObjetivoEspecificoDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionObjetivoEspecificoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionDestinatarioDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionObjetivoEspecificoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionObjetivoEspecifico WHERE idDeceIntervencionObjetivoEspecifico = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionObjetivoEspecifico WHERE idDeceIntervencionObjetivoEspecifico = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--===================================LISTAR===================================================
GO
IF OBJECT_ID('[uspDeceIntervencionObjetivoGeneralGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionObjetivoGeneralGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionObjetivoGeneralGet] '', '{"id":5}'
CREATE PROC [dbo].[uspDeceIntervencionObjetivoGeneralGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,@value VARCHAR (MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value = (SELECT drc.[idDeceIntervencionObjetivoGeneral]
	,	drc.[idDeceIntervencion]
	,	drc.[descripcion]
	,	oe.[idDeceIntervencionObjetivoEspecifico]
	,	oe.[objEspecifico]
	,	oe.[objEspecifico2]
	,	oe.[objEspecifico3]
	,	ddop.[idDeceIntervencionAccionEstrategia]
	,	ddop.[acciones]
	,	ddop.[responsable]
	,	ddop.[acciones2]
	,	ddop.[responsable2]
	,	ddop.[acciones3]
	,	ddop.[responsable3]
	,	ddop.[acciones4]
	,	ddop.[responsable4]
	,	ddop.[acciones5]
	,	ddop.[responsable5]
	,	ddop.[acciones6]
	,	ddop.[responsable6]
	,	ddop.[acciones7]
	,	ddop.[responsable7]
	,	ddop.[acciones8]
	,	ddop.[responsable8]
	,	ddop.[acciones9]
	,	ddop.[responsable9]
	FROM dbo.DeceIntervencionObjetivoGeneral drc
	INNER JOIN dbo.DeceIntervencionObjetivoEspecifico oe on oe.idDeceIntervencionObjetivoGeneral=drc.idDeceIntervencionObjetivoGeneral
	INNER JOIN dbo.DeceIntervencionAccionEstrategia ddop ON	ddop.idDeceIntervencionObjetivoEspecifico = oe.idDeceIntervencionObjetivoEspecifico
	and drc.idDeceIntervencion=@id
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--============================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionObjetivoGeneralInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionObjetivoGeneralInsert
GO 
-- =============================================
-- Author:		Jefferson Mena-Jonathan
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
--uspDeceIntervencionObjetivoGeneralInsert '','{"idDeceIntervencionObjetivoGeneral":0,"idDeceIntervencion":8,"esp":[{"idDeceIntervencionObjetivoEspecifico":0,"idDeceIntervencionObjetivoGeneral":0,"descripcion":"DASD","fechaRegistro":"0001-01-01T00:00:00"}],"acc":[{"idDeceIntervencionAccionEstrategia":0,"idDeceIntervencionObjetivoEspecifico":0,"descripcion":"ASDASD","responsable":"ASDADS","fechaRegistro":"0001-01-01T00:00:00"}],"descripcion":"ASDAS","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceIntervencionObjetivoGeneralInsert 
 @authClientJson NVARCHAR(MAX) = NuLL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@ide INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceIntervencion INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
	SELECT  @idDeceIntervencion = idDeceIntervencion
	FROM OPENJSON(@dataFormJson) 
	WITH (
		idDeceIntervencion INT '$.idDeceIntervencion'
	)AS cr

		INSERT INTO dbo.DeceIntervencionObjetivoGeneral( idDeceIntervencion, descripcion, fechaRegistro  )
		SELECT  @idDeceIntervencion,cr.descripcion,@fechaHoy
		FROM OPENJSON(@dataFormJson) 
		WITH (
			descripcion			VARCHAR(500) '$.descripcion'
		)AS cr

		SET @id =@@IDENTITY
		
		INSERT INTO dbo.DeceIntervencionObjetivoEspecifico(idDeceIntervencionObjetivoGeneral, objEspecifico,objEspecifico2,objEspecifico3, fechaRegistro)
		SELECT  @id,ce.objEspecifico,objEspecifico2,objEspecifico3,@fechaHoy
		FROM OPENJSON(@dataFormJson,'$.esp') 
		WITH (
			objEspecifico			VARCHAR(300) '$.objEspecifico',
			objEspecifico2			VARCHAR(300) '$.objEspecifico2',
			objEspecifico3			VARCHAR(300) '$.objEspecifico3'
		)AS ce

		SET @ide =@@IDENTITY
		
		INSERT INTO dbo.DeceIntervencionAccionEstrategia(idDeceIntervencionObjetivoEspecifico, acciones, responsable, acciones2, responsable2, acciones3, responsable3, acciones4, responsable4, acciones5, responsable5, acciones6, responsable6, acciones7, responsable7, acciones8, responsable8, acciones9, responsable9, fechaRegistro)
		SELECT  @ide,acr.acciones,acr.responsable,acr.acciones2,acr.responsable2,acr.acciones3,acr.responsable3,acr.acciones4,acr.responsable4,acr.acciones5,acr.responsable5,acr.acciones6,acr.responsable6,acr.acciones7,acr.responsable7,acr.acciones8,acr.responsable8,acr.acciones9,acr.responsable9,@fechaHoy
		FROM OPENJSON(@dataFormJson, '$.acc') 
		WITH (
			acciones			VARCHAR(100) '$.acciones',
			responsable			VARCHAR(100) '$.responsable',
			acciones2			VARCHAR(100) '$.acciones2',
			responsable2		VARCHAR(100) '$.responsable2',
			acciones3			VARCHAR(100) '$.acciones3',
			responsable3		VARCHAR(100) '$.responsable3',
			acciones4			VARCHAR(100) '$.acciones4',
			responsable4			VARCHAR(100) '$.responsable4',
			acciones5			VARCHAR(100) '$.acciones5',
			responsable5			VARCHAR(100) '$.responsable5',
			acciones6			VARCHAR(100) '$.acciones6',
			responsable6		VARCHAR(100) '$.responsable6',
			acciones7			VARCHAR(100) '$.acciones7',
			responsable7			VARCHAR(100) '$.responsable7',
			acciones8			VARCHAR(100) '$.acciones8',
			responsable8			VARCHAR(100) '$.responsable8',
			acciones9			VARCHAR(100) '$.acciones9',
			responsable9			VARCHAR(100) '$.responsable9'
		)AS acr
		
	COMMIT TRAN

	SELECT '1', 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




GO
IF OBJECT_ID('uspDeceIntervencionObjetivoGeneralUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionObjetivoGeneralUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObjetivoGeneralUpdate '','{"id":1}','{"idDeceIntervencionObjetivoGeneral":1,"idDeceIntervencion":1,"descripcion":"HLA","esp":{"idDeceIntervencionObjetivoEspecifico":1,"idDeceIntervencionObjetivoGeneral":1,"objEspecifico":"p","objEspecifico2":"p","objEspecifico3":"yp","fechaRegistro":"0001-01-01T00:00:00"},"acc":{"idDeceIntervencionAccionEstrategia":1,"idDeceIntervencionObjetivoEspecifico":1,"acciones":"y","responsable":"y","acciones2":"y","responsable2":"y","acciones3":"y","responsable3":"y","acciones4":"y","responsable4":"y","acciones5":"y","responsable5":"y","acciones6":"y","responsable6":"y","acciones7":"y","responsable7":"y","acciones8":"y","responsable8":"y","acciones9":"y","responsable9":"y","fechaRegistro":"0001-01-01T00:00:00"},"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceIntervencionObjetivoGeneralUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idg INT 
,	@ide INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
			FROM OPENJSON(@identifierFormJson) 
			WITH (
				id	INT    '$.id'
			)
	
	SELECT @idg = idDeceIntervencionObjetivoGeneral
			FROM OPENJSON(@dataFormJson) 
			WITH (
			idDeceIntervencionObjetivoGeneral	INT    '$.idDeceIntervencionObjetivoGeneral'
			)
	
	BEGIN TRAN

	UPDATE crdu
		
		SET 
		  crdu.descripcion=dcj.descripcion 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionObjetivoGeneral	INT '$.idDeceIntervencionObjetivoGeneral'
		,	descripcion							VARCHAR(500) '$.descripcion'
		) as dcj
		join dbo.DeceIntervencionObjetivoGeneral  crdu ON crdu.idDeceIntervencionObjetivoGeneral = dcj.idDeceIntervencionObjetivoGeneral
		WHERE crdu.idDeceIntervencion =@id
		
	UPDATE oe
		
		SET 
		  oe.objEspecifico=oei.objEspecifico,
		  oe.objEspecifico2=oei.objEspecifico2, 
		  oe.objEspecifico3=oei.objEspecifico3 
	
		FROM OPENJSON(@dataFormJson, '$.esp') 
		WITH (

			idDeceIntervencionObjetivoEspecifico	INT '$.idDeceIntervencionObjetivoEspecifico',
			idDeceIntervencionObjetivoGeneral	INT '$.idDeceIntervencionObjetivoGeneral',
			objEspecifico			VARCHAR(300) '$.objEspecifico',
			objEspecifico2			VARCHAR(300) '$.objEspecifico2',
			objEspecifico3			VARCHAR(300) '$.objEspecifico3'
		) as oei
		join dbo.DeceIntervencionObjetivoEspecifico  oe ON oe.idDeceIntervencionObjetivoEspecifico = oei.idDeceIntervencionObjetivoEspecifico
		WHERE oe.idDeceIntervencionObjetivoGeneral=oei.idDeceIntervencionObjetivoGeneral

	UPDATE ae
		
		SET  
		  ae.acciones	=aei.acciones, 
		  ae.responsable	=aei.responsable, 
		  ae.acciones2	=aei.acciones2, 
		  ae.responsable2=aei.responsable2, 
		  ae.acciones3	=aei.acciones3, 
		  ae.responsable3=aei.responsable3, 
		  ae.acciones4	=aei.acciones4, 
		  ae.responsable4=aei.responsable4, 
		  ae.acciones5	=aei.acciones5, 
		  ae.responsable5=aei.responsable5, 
		  ae.acciones6	=aei.acciones6, 
		  ae.responsable6=aei.responsable6, 
		  ae.acciones7	=aei.acciones7, 
		  ae.responsable7=aei.responsable7, 
		  ae.acciones8	=aei.acciones8, 
		  ae.responsable8=aei.responsable8,
		  ae.acciones9	=aei.acciones9,
		  ae.responsable9=aei.responsable9
		
	
		FROM OPENJSON(@dataFormJson, '$.acc') 
		WITH (

			idDeceIntervencionAccionEstrategia	INT '$.idDeceIntervencionAccionEstrategia',
			idDeceIntervencionObjetivoEspecifico	INT '$.idDeceIntervencionObjetivoEspecifico',
			acciones			VARCHAR(100) '$.acciones',
			responsable			VARCHAR(100) '$.responsable',
			acciones2			VARCHAR(100) '$.acciones2',
			responsable2		VARCHAR(100) '$.responsable2',
			acciones3			VARCHAR(100) '$.acciones3',
			responsable3		VARCHAR(100) '$.responsable3',
			acciones4			VARCHAR(100) '$.acciones4',
			responsable4			VARCHAR(100) '$.responsable4',
			acciones5			VARCHAR(100) '$.acciones5',
			responsable5			VARCHAR(100) '$.responsable5',
			acciones6			VARCHAR(100) '$.acciones6',
			responsable6		VARCHAR(100) '$.responsable6',
			acciones7			VARCHAR(100) '$.acciones7',
			responsable7			VARCHAR(100) '$.responsable7',
			acciones8			VARCHAR(100) '$.acciones8',
			responsable8			VARCHAR(100) '$.responsable8',
			acciones9			VARCHAR(100) '$.acciones9',
			responsable9			VARCHAR(100) '$.responsable9'

		) as aei
		join dbo.DeceIntervencionAccionEstrategia  ae ON ae.idDeceIntervencionAccionEstrategia = aei.idDeceIntervencionAccionEstrategia
		WHERE ae.idDeceIntervencionObjetivoEspecifico= aei.idDeceIntervencionObjetivoEspecifico
	
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionObjetivoGeneralDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionObjetivoGeneralDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObjetivoGeneralDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionObjetivoGeneralDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--==========================================LISTAR============================================================
GO
IF OBJECT_ID('[uspDeceIntervencionObsRecomendacionGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionObsRecomendacionGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionObsRecomendacionGet] '', '{"id":22}'
CREATE PROC [dbo].[uspDeceIntervencionObsRecomendacionGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceIntervencionObsRecomendacion]
	,	drc.[idDeceIntervencion]
	,	drc.[descripcion]
	,	drc.[fechaRegistro]
	FROM dbo.DeceIntervencionObsRecomendacion drc
	
	WHERE drc.idDeceIntervencion = @id
		FOR JSON PATH)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--============================================================================================================

GO
IF OBJECT_ID('uspDeceIntervencionObsRecomendacionInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionObsRecomendacionInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObsRecomendacionInsert '','{"idDeceIntervencionObsRecomendacion":0,"idDeceIntervencion":0,"descripcion":"dasdsad","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceIntervencionObsRecomendacionInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY


	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
	
		INSERT INTO dbo.DeceIntervencionObsRecomendacion( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT di.idDeceIntervencion, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceIntervencion	INT '$.idDeceIntervencion'
		,	descripcion			VARCHAR(300) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceIntervencionObsRecomendacion sd WHERE sd.idDeceIntervencionObsRecomendacion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		
	

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




GO
IF OBJECT_ID('uspDeceIntervencionObsRecomendacionUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionObsRecomendacionUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObjetivoGeneralUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionObsRecomendacionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencion=dcj.idDeceIntervencion
		,   crdu.descripcion=dcj.descripcion 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionObsRecomendacion	INT '$.idDeceIntervencionObsRecomendacion'
		,	idDeceIntervencion					INT '$.idDeceIntervencion'
		,	descripcion							VARCHAR(300) '$.descripcion'
		) as dcj
		join dbo.DeceIntervencionObsRecomendacion  crdu ON crdu.idDeceIntervencionObsRecomendacion = dcj.idDeceIntervencionObsRecomendacion

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionObsRecomendacion   WHERE idDeceIntervencionObsRecomendacion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionObsRecomendacionDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionObsRecomendacionDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionObjetivoGeneralDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionObsRecomendacionDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionObsRecomendacion WHERE idDeceIntervencionObsRecomendacion = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionObsRecomendacion WHERE idDeceIntervencionObsRecomendacion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




--===========================LISTAR================================================
GO
IF OBJECT_ID('[uspDeceIntervencionResultadoObtenidoGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionResultadoObtenidoGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionResultadoObtenidoGet] '', '{"id":22}'
CREATE PROC [dbo].[uspDeceIntervencionResultadoObtenidoGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceIntervencionResultadoObtenido]
	,	drc.[idDeceIntervencion]
	,	drc.[descripcion]
	,	drc.[fechaRegistro]
	FROM dbo.DeceIntervencionResultadoObtenido drc

	WHERE drc.idDeceIntervencion = @id
		FOR JSON PATH)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT '1',	'',	'',	@value AS payload
	RETURN

END

--=================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionResultadoObtenidoInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionResultadoObtenidoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionResultadoObtenidoInsert '', '{"idDeceIntervencion":3,"res":[{"idDeceIntervencionResultadoObtenido":0,"idDeceIntervencion":0,"descripcion":"d","fechaRegistro":"0001-01-01T00:00:00"}],"ior":[{"idDeceIntervencionObsRecomendacion":0,"idDeceIntervencion":0,"descripcion":"d","fechaRegistro":"0001-01-01T00:00:00"}]}'
CREATE PROC uspDeceIntervencionResultadoObtenidoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceIntervencion INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = idDeceIntervencion
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencion	INT    '$.idDeceIntervencion'
		)
	print @id
	BEGIN TRAN
	print '1'

		INSERT INTO dbo.DeceIntervencionResultadoObtenido( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT @id, di.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.res') 
			WITH (
				idDeceIntervencionResultadoObtenido INT '$.idDeceIntervencionResultadoObtenido'
			,	descripcion VARCHAR(300) '$.descripcion'
			)	AS di
	print '1'

		INSERT INTO dbo.DeceIntervencionObsRecomendacion( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT @id, di2.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson,'$.ior')
		WITH(
			
			descripcion			VARCHAR(300) '$.descripcion'
		
		) AS di2
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO

IF OBJECT_ID('uspDeceIntervencionResultadoObtenidoUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionResultadoObtenidoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
--SELECT *FROM DeceIntervencionObsRecomendacion
-- uspDeceIntervencionResultadoObtenidoUpdate '','{"id":3}','{"idDeceIntervencion":3,"res":[{"idDeceIntervencionResultadoObtenido":0,"idDeceIntervencion":0,"descripcion":"d","fechaRegistro":"0001-01-01T00:00:00"}],"ior":[{"idDeceIntervencionObsRecomendacion":0,"idDeceIntervencion":0,"descripcion":"d","fechaRegistro":"0001-01-01T00:00:00"}]}'
CREATE PROC uspDeceIntervencionResultadoObtenidoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	BEGIN TRAN

		DELETE dei FROM dbo.DeceIntervencionResultadoObtenido dei
		WHERE dei.idDeceIntervencion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.res') 
			WITH ( idDeceIntervencionResultadoObtenido	INT '$.idDeceIntervencionResultadoObtenido' )	AS di
			WHERE dei.idDeceIntervencionResultadoObtenido = di.idDeceIntervencionResultadoObtenido
		)
		--select * from DeceIntervencion
		INSERT INTO dbo.DeceIntervencionResultadoObtenido( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT @id, di.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.res') 
			WITH (
				idDeceIntervencionResultadoObtenido INT '$.idDeceIntervencionResultadoObtenido'
			,	descripcion VARCHAR(300) '$.descripcion'
			)	AS di

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceIntervencionResultadoObtenido di2
			WHERE  di2.idDeceIntervencion = @id
			AND di2.idDeceIntervencionResultadoObtenido = di.idDeceIntervencionResultadoObtenido
			)

		DELETE ob FROM dbo.DeceIntervencionObsRecomendacion ob
		WHERE ob.idDeceIntervencion = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.ior') 
			WITH ( idDeceIntervencionObsRecomendacion	INT '$.idDeceIntervencionObsRecomendacion' )	AS re
			WHERE ob.idDeceIntervencionObsRecomendacion = re.idDeceIntervencionObsRecomendacion
		)
		--select * from DeceIntervencion
		INSERT INTO dbo.DeceIntervencionObsRecomendacion( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT @id, di.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.ior') 
			WITH (
				idDeceIntervencionObsRecomendacion INT '$.idDeceIntervencionObsRecomendacion'
			,	descripcion VARCHAR(300) '$.descripcion'
			)	AS di

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceIntervencionObsRecomendacion di2
			WHERE  di2.idDeceIntervencion = @id
			AND di2.idDeceIntervencionObsRecomendacion = di.idDeceIntervencionObsRecomendacion
			)

		
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionResultadoObtenidoDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionResultadoObtenidoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionResultadoObtenidoDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionResultadoObtenidoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionResultadoObtenido WHERE idDeceIntervencionResultadoObtenido = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionResultadoObtenido WHERE idDeceIntervencionResultadoObtenido = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--=======================================LISTAR================================================

GO
IF OBJECT_ID('[uspDeceIntervencionRiesgoIdentificadoGet]') IS NOT NULL
	DROP PROC [uspDeceIntervencionRiesgoIdentificadoGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceIntervencionRiesgoIdentificadoGet] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceIntervencionRiesgoIdentificadoGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceIntervencionRiesgoIdentificado]
	,	drc.[idDeceIntervencion]
	,	drc.[descripcion]
	FROM dbo.DeceIntervencionRiesgoIdentificado drc
	
	WHERE drc.idDeceIntervencion= @id
		FOR JSON PATH )

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END


--=============================================================================================
GO
IF OBJECT_ID('uspDeceIntervencionRiesgoIdentificadoInsert ') IS NOT NULL 
	DROP PROC uspDeceIntervencionRiesgoIdentificadoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionRiesgoIdentificadoInsert 0, 0, 0, 0
CREATE PROC uspDeceIntervencionRiesgoIdentificadoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceIntervencionRiesgoIdentificado( idDeceIntervencion, descripcion, fechaRegistro)
		SELECT di.idDeceIntervencion, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceIntervencion	INT '$.idDeceIntervencion'
		,	descripcion			VARCHAR(300) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceIntervencionRiesgoIdentificado sd WHERE sd.idDeceIntervencionRiesgoIdentificado = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

GO

IF OBJECT_ID('uspDeceIntervencionRiesgoIdentificadoUpdate') IS NOT NULL
	DROP PROC uspDeceIntervencionRiesgoIdentificadoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionRiesgoIdentificadoUpdate 0, 0, 0, 0
CREATE PROC uspDeceIntervencionRiesgoIdentificadoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceIntervencion=dcj.idDeceIntervencion
		,   crdu.descripcion=dcj.descripcion 

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceIntervencionRiesgoIdentificado	INT '$.idDeceIntervencionRiesgoIdentificado'
		,	idDeceIntervencion					INT '$.idDeceIntervencion'
		,	descripcion							VARCHAR(300) '$.descripcion'
		) as dcj
		join dbo.DeceIntervencionRiesgoIdentificado  crdu ON crdu.idDeceIntervencionRiesgoIdentificado = dcj.idDeceIntervencionRiesgoIdentificado

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceIntervencionRiesgoIdentificado   WHERE idDeceIntervencionRiesgoIdentificado = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceIntervencionRiesgoIdentificadoDelete ') IS NOT NULL
	DROP PROC uspDeceIntervencionRiesgoIdentificadoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceIntervencionRiesgoIdentificadoDelete 0, 0, 0, 0
CREATE PROC uspDeceIntervencionRiesgoIdentificadoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceIntervencionRiesgoIdentificado WHERE idDeceIntervencionRiesgoIdentificado = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceIntervencionRiesgoIdentificado WHERE idDeceIntervencionRiesgoIdentificado = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--=================================LISTAR=======================================================================================
GO
IF OBJECT_ID('uspDeceDeteccionRemisionCasoGet ') IS NOT NULL 
	DROP PROC uspDeceDeteccionRemisionCasoGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDeteccionRemisionCasoGet 0, 0, 0, 0
CREATE PROC uspDeceDeteccionRemisionCasoGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
,	@value VARCHAR(MAX) = NULL

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	SET @value = (SELECT 
		drc.[idDeceDeteccionRemisionCaso]	
	,	drc.[codigo]  
	,	drc.[codAlumno]
	,	CAST(drc.[fechaNacimiento] as DATE) AS fechaNacimiento
	,	drc.[curso] 
	,	CAST(drc.[fechaDeteccionRemision] as DATE) AS fechaDeteccionRemision
	,	CAST(drc.[fechaReporte] as DATE) AS fechaReporte
	,	drc.[nombreAlumno]
	,	drc.[idModalidad]
	,	drc.[modalidad]
	,	drc.[idGrado]
	,	drc.[codigoGrado]
	,	drc.[descripcionGrado]
	,	drc.[idParalelo]
	,	drc.[paralelo]
	,	drc.[idTurno]
	,	drc.[turno]

	FROM dbo.DeceDeteccionRemisionCaso drc
	
--	and dss.idDeceSesionSeguimiento = 4
	FOR JSON PATH )

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END
--==============================================================================================================================
GO
IF OBJECT_ID('[uspDeceDeteccionRemisionCasoByIdGet]') IS NOT NULL
	DROP PROC [uspDeceDeteccionRemisionCasoByIdGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDeteccionRemisionCasoByIdGet] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceDeteccionRemisionCasoByIdGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
,	@value VARCHAR(MAX) = NULL
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SET @value =(SELECT drc.[idDeceDeteccionRemisionCaso]
	,	CAST(drc.fechaNacimiento as DATE) AS fechaNacimiento
	,	drc.[curso]
	,	CAST(drc.[fechaDeteccionRemision] as DATE) AS fechaDeteccionRemision
	,	CAST(drc.[fechaReporte] as DATE) AS fechaReporte
	,	drc.[codigo]
	,	drc.[codigoReportadoX]
	,	drc.[codAlumno]
	,	drc.[nombreAlumno]

	,	drc.[idModalidad]
	,	drc.[modalidad]
	,	drc.[idGrado]
	,	drc.[codigoGrado]
	,	drc.[descripcionGrado]
	,	drc.[idParalelo]
	,	drc.[paralelo]
	,	drc.[idTurno]
	,	drc.[turno]

	FROM dbo.DeceDeteccionRemisionCaso drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN
END


--==================================================================================================================================

GO
IF OBJECT_ID('uspDeceDeteccionRemisionCasoInsert ') IS NOT NULL 
	DROP PROC uspDeceDeteccionRemisionCasoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDeteccionRemisionCasoInsert NULL, '{"idDeceDeteccionRemisionCaso":0,"codigo":"132HJD","estadoVersion":"0.0.1","estadoCierre":true,"fechaDeteccionRemision":"2022-05-09T00:00:00","codAlumno":14374,"curso":"5to Básica \"A\"","fechaNacimiento":"2022-05-09T00:00:00","fechaReporte":"2022-05-09T00:00:00","codigoReportadoX":1,"fechaRegistro":"0001-01-01T00:00:00","idUsuario":1}'
CREATE PROC uspDeceDeteccionRemisionCasoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

	--select * from DeceDeteccionRemisionCaso
		INSERT INTO dbo.DeceDeteccionRemisionCaso(codigo, estadoVersion, estadoCierre, fechaDeteccionRemision, codAlumno, nombreAlumno, curso, fechaNacimiento, fechaReporte, codigoReportadoX, fechaRegistro, idUsuario, idSucursal, gestion, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT di.codigo, '0.0.2' , 1 ,CAST(di.fechaDeteccionRemision AS DATE), di.codAlumno,di.nombreAlumno, di.curso,CAST( di.fechaNacimiento AS DATE), CAST( di.fechaReporte AS DATE), di.codigoReportadoX, @fechaHoy, @idUsuario, @idSucursal, di.gestion,@nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			codigo					VARCHAR(50) '$.codigo'
		,	fechaDeteccionRemision	VARCHAR(300) '$.fechaDeteccionRemision'
		,	codAlumno				INT '$.codAlumno'
		,	nombreAlumno			VARCHAR(500) '$.nombreAlumno'
		,	curso					VARCHAR(50) '$.curso'
		,	fechaNacimiento			VARCHAR(300) '$.fechaNacimiento'
		,	fechaReporte			VARCHAR(300) '$.fechaReporte'
		,	codigoReportadoX		INT '$.codigoReportadoX'
		
 		,	gestion					INT	'$.gestion	'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'

		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDeteccionRemisionCaso sd WHERE sd.idDeceDeteccionRemisionCaso = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO

IF OBJECT_ID('uspDeceDeteccionRemisionCasoUpdate') IS NOT NULL
	DROP PROC uspDeceDeteccionRemisionCasoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDeteccionRemisionCasoUpdate 0, 0, 0, 0
CREATE PROC uspDeceDeteccionRemisionCasoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

		UPDATE crdu
		
		SET 
			crdu.codigo=dcj.codigo
		,	crdu.fechaDeteccionRemision= CAST (dcj.fechaDeteccionRemision AS DATE) 
		,	crdu.codAlumno=dcj.codAlumno
		,	crdu.nombreAlumno=dcj.nombreAlumno
		,	crdu.curso=dcj.curso
		,	crdu.fechaNacimiento=CAST(dcj.fechaNacimiento AS DATE)
		,	crdu.fechaReporte=CAST(dcj.fechaReporte AS DATE)
		,	crdu.codigoReportadoX=dcj.codigoReportadoX
				
 		,	crdu.idModalidad		=  dcj.idModalidad					
 		,	crdu.modalidad		=  dcj.modalidad				
 		,	crdu.idGrado			=  dcj.idGrado						
 		,	crdu.codigoGrado		=  dcj.codigoGrado					
 		,	crdu.descripcionGrado =  dcj.descripcionGrado		
 		,	crdu.idParalelo		=  dcj.idParalelo					
 		,	crdu.paralelo		=  dcj.paralelo				
		,	crdu.idTurno			=  dcj.idTurno						
		,	crdu.turno			=  dcj.turno


		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	codigo						VARCHAR(50) '$.codigo'
		,	fechaDeteccionRemision		VARCHAR(300) '$.fechaDeteccionRemision'
		,	codAlumno					INT '$.codAlumno'
		,	nombreAlumno				VARCHAR(500) '$.nombreAlumno'
		,	curso						VARCHAR(50) '$.curso'
		,	fechaNacimiento				VARCHAR(300) '$.fechaNacimiento'
		,	fechaReporte				VARCHAR(300) '$.fechaReporte'
		,	codigoReportadoX			INT '$.codigoReportadoX'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'

		) as dcj
		join dbo.DeceDeteccionRemisionCaso  crdu ON crdu.idDeceDeteccionRemisionCaso = dcj.idDeceDeteccionRemisionCaso
		WHERE crdu.idDeceDeteccionRemisionCaso = @id
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	

END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDeteccionRemisionCasoDelete ') IS NOT NULL
	DROP PROC uspDeceDeteccionRemisionCasoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDeteccionRemisionCasoDelete 0, 0, 0, 0
CREATE PROC uspDeceDeteccionRemisionCasoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
	BEGIN TRAN	
	
		DELETE FROM  dbo.DeceDRCAcuerdoEstablecido WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCMotivoReporte WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCDescripcionCasoItem3 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCInformeSeguimientoItem4 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCInformeSeguimientoItem5 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCAccionRealizarItem6 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCAccionRealizarItem7 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCInformeSeguimientoItem7 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCInformeSeguimientoItem8 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCAcuerdosItem8 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCObsSugerenciaItem9 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDRCInformeSeguimientoItem10 WHERE idDeceDeteccionRemisionCaso = @id

		DELETE FROM  dbo.DeceDeteccionRemisionCaso WHERE idDeceDeteccionRemisionCaso = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDeteccionRemisionCaso WHERE idDeceDeteccionRemisionCaso = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--===========================LISTAR============================================
GO
IF OBJECT_ID('[uspDeceDRCAccionRealizarItem6Get]') IS NOT NULL
	DROP PROC [uspDeceDRCAccionRealizarItem6Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCAccionRealizarItem6Get] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceDRCAccionRealizarItem6Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCAccionRealizarItem6]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	FROM dbo.DeceDRCAccionRealizarItem6 drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END


--=============================================================================
GO
IF OBJECT_ID('uspDeceDRCAccionRealizarItem6Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCAccionRealizarItem6Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem6Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem6Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCAccionRealizarItem6( idDeceDeteccionRemisionCaso, descripcion, fechaRegistro)
		SELECT di.idDeceDeteccionRemisionCaso, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion					VARCHAR(500) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCAccionRealizarItem6 sd WHERE sd.idDeceDRCAccionRealizarItem6 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCAccionRealizarItem6Update') IS NOT NULL
	DROP PROC uspDeceDRCAccionRealizarItem6Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem6Update 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem6Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)
	BEGIN TRAN

		UPDATE crdu
		
		SET 
		   crdu.descripcion=dcj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCAccionRealizarItem6	INT '$.idDeceDRCAccionRealizarItem6'
		,	idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		) as dcj
		join dbo.DeceDRCAccionRealizarItem6  crdu ON crdu.idDeceDRCAccionRealizarItem6 = dcj.idDeceDRCAccionRealizarItem6
		where crdu.idDeceDeteccionRemisionCaso=@id

			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

GO
IF OBJECT_ID('uspDeceDRCAccionRealizarItem6Delete ') IS NOT NULL
	DROP PROC uspDeceDRCAccionRealizarItem6Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem6Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem6Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCAccionRealizarItem6 WHERE idDeceDRCAccionRealizarItem6 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCAccionRealizarItem6 WHERE idDeceDRCAccionRealizarItem6 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--====================================================LISTAR============================================
GO
IF OBJECT_ID('[uspDeceDRCAccionRealizarItem7Get]') IS NOT NULL
	DROP PROC [uspDeceDRCAccionRealizarItem7Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCAccionRealizarItem7Get] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceDRCAccionRealizarItem7Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCAccionRealizarItem7]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	FROM dbo.DeceDRCAccionRealizarItem7 drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--======================================================================================================

GO
IF OBJECT_ID('uspDeceDRCAccionRealizarItem7Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCAccionRealizarItem7Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem6Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem7Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCAccionRealizarItem7(idDeceDeteccionRemisionCaso, descripcion, fechaRegistro )
		SELECT di.idDeceDeteccionRemisionCaso, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion					VARCHAR(500) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCAccionRealizarItem7 sd WHERE sd.idDeceDRCAccionRealizarItem7 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceDRCAccionRealizarItem7Update]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceDRCAccionRealizarItem7Update') IS NOT NULL
	DROP PROC uspDeceDRCAccionRealizarItem7Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem7Update 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem7Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceDeteccionRemisionCaso=dcj.idDeceDeteccionRemisionCaso
		,   crdu.descripcion=dcj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCAccionRealizarItem7	INT '$.idDeceDRCAccionRealizarItem7'
		,	idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		) as dcj
		join dbo.DeceDRCAccionRealizarItem7  crdu ON crdu.idDeceDRCAccionRealizarItem7 = dcj.idDeceDRCAccionRealizarItem7

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceDRCAccionRealizarItem7   WHERE idDeceDRCAccionRealizarItem7 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceDRCAccionRealizarItem7Delete]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('uspDeceDRCAccionRealizarItem7Delete ') IS NOT NULL
	DROP PROC uspDeceDRCAccionRealizarItem7Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAccionRealizarItem7Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCAccionRealizarItem7Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCAccionRealizarItem7 WHERE idDeceDRCAccionRealizarItem7 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCAccionRealizarItem7 WHERE idDeceDRCAccionRealizarItem7 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--========================================LISTAR========================================
GO
IF OBJECT_ID('[uspDeceDRCAcuerdoEstablecidoGet]') IS NOT NULL
	DROP PROC [uspDeceDRCAcuerdoEstablecidoGet]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCAcuerdoEstablecidoGet] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceDRCAcuerdoEstablecidoGet]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCAcuerdoEstablecido]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[acuerdoPadre]
	,	drc.[acuerdoAlumno]
	FROM dbo.DeceDRCAcuerdoEstablecido drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH )
	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT '1',	'',	'',	@value AS payload
	RETURN
END

--======================================================================================

GO
IF OBJECT_ID('uspDeceDRCAcuerdoEstablecidoInsert ') IS NOT NULL 
	DROP PROC uspDeceDRCAcuerdoEstablecidoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdoEstablecidoInsert 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdoEstablecidoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCAcuerdoEstablecido( idDeceDeteccionRemisionCaso, acuerdoPadre, acuerdoAlumno, fechaRegistro )
		SELECT di.idDeceDeteccionRemisionCaso, di.acuerdoPadre,di.acuerdoAlumno, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	acuerdoPadre					VARCHAR(500) '$.acuerdoPadre'
		,	acuerdoAlumno					VARCHAR(500) '$.acuerdoAlumno'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCAcuerdoEstablecido sd WHERE sd.idDeceDRCAcuerdoEstablecido = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceDRCAcuerdoEstablecidoUpdate]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceDRCAcuerdoEstablecidoUpdate') IS NOT NULL
	DROP PROC uspDeceDRCAcuerdoEstablecidoUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdoEstablecidoUpdate 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdoEstablecidoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceDeteccionRemisionCaso=dcj.idDeceDeteccionRemisionCaso
		,   crdu.acuerdoPadre=dcj.acuerdoPadre
		,   crdu.acuerdoAlumno=dcj.acuerdoAlumno

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCAcuerdoEstablecido	INT '$.idDeceDRCAcuerdoEstablecido'
		,	idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	acuerdoPadre					VARCHAR(500) '$.acuerdoPadre'
		,	acuerdoAlumno					VARCHAR(500) '$.acuerdoAlumno'
		) as dcj
		join dbo.DeceDRCAcuerdoEstablecido  crdu ON crdu.idDeceDRCAcuerdoEstablecido = dcj.idDeceDRCAcuerdoEstablecido

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceDRCAcuerdoEstablecido   WHERE idDeceDRCAcuerdoEstablecido = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceDRCAcuerdoEstablecidoDelete]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('uspDeceDRCAcuerdoEstablecidoDelete ') IS NOT NULL
	DROP PROC uspDeceDRCAcuerdoEstablecidoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdoEstablecidoDelete 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdoEstablecidoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCAcuerdoEstablecido WHERE idDeceDRCAcuerdoEstablecido = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCAcuerdoEstablecido WHERE idDeceDRCAcuerdoEstablecido = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--======================================LISTAR===========================================================================
GO
IF OBJECT_ID('[uspDeceDRCAcuerdosItem8Get]') IS NOT NULL
	DROP PROC [uspDeceDRCAcuerdosItem8Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCAcuerdosItem8Get] '', '{"id":3}'
CREATE PROC [dbo].[uspDeceDRCAcuerdosItem8Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCAcuerdosItem8]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	,	drc.[fechaRegistro]
	FROM dbo.DeceDRCAcuerdosItem8 drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH,WITHOUT_ARRAY_WRAPPER)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT 	'1',	'',	'',	@value AS payload
	RETURN
END


--======================================================================================================================

GO
IF OBJECT_ID('uspDeceDRCAcuerdosItem8Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCAcuerdosItem8Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdosItem8Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdosItem8Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCAcuerdosItem8( idDeceDeteccionRemisionCaso, descripcion, fechaRegistro )
		SELECT di.idDeceDeteccionRemisionCaso, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion					VARCHAR(500) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCAcuerdosItem8 sd WHERE sd.idDeceDRCAcuerdosItem8 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO

IF OBJECT_ID('uspDeceDRCAcuerdosItem8Update') IS NOT NULL
	DROP PROC uspDeceDRCAcuerdosItem8Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdosItem8Update 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdosItem8Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''



BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceDeteccionRemisionCaso=dcj.idDeceDeteccionRemisionCaso
		,   crdu.descripcion=dcj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCAcuerdosItem8			INT '$.idDeceDRCAcuerdosItem8'
		,	idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		) as dcj
		join dbo.DeceDRCAcuerdosItem8  crdu ON crdu.idDeceDRCAcuerdosItem8 = dcj.idDeceDRCAcuerdosItem8

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceDRCAcuerdosItem8   WHERE idDeceDRCAcuerdosItem8 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCAcuerdosItem8Delete ') IS NOT NULL
	DROP PROC uspDeceDRCAcuerdosItem8Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCAcuerdosItem8Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCAcuerdosItem8Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCAcuerdosItem8 WHERE idDeceDRCAcuerdosItem8 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCAcuerdosItem8 WHERE idDeceDRCAcuerdosItem8 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--=====================================================LISTAR=========================================================================================
GO
IF OBJECT_ID('[uspDeceDRCDescripcionCasoItem3Get]') IS NOT NULL
	DROP PROC [uspDeceDRCDescripcionCasoItem3Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCDescripcionCasoItem3Get] '', '{"id":	21}'
CREATE PROC [dbo].[uspDeceDRCDescripcionCasoItem3Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

SET @value=(SELECT drc.[idDeceDRCDescripcionCasoItem3]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	FROM dbo.DeceDRCDescripcionCasoItem3 drc
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END
	SELECT 	'1','',	'',	@value AS payload
	RETURN
END
--select * from DeceDRCDescripcionCasoItem3

select * from DeceDRCDescripcionCasoItem3
--====================================================================================================================================================
GO
IF OBJECT_ID('uspDeceDRCDescripcionCasoItem3Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCDescripcionCasoItem3Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCDescripcionCasoItem3Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCDescripcionCasoItem3Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCDescripcionCasoItem3( idDeceDeteccionRemisionCaso, descripcion, idUsuario  )
		SELECT di.idDeceDeteccionRemisionCaso, di.descripcion, di.idUsuario
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion					VARCHAR(max) '$.descripcion'
		,	idUsuario					INT '$.idUsuario'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCDescripcionCasoItem3 sd WHERE sd.idDeceDRCDescripcionCasoItem3 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--select * from DeceDeteccionRemisionCaso

GO

IF OBJECT_ID('uspDeceDRCDescripcionCasoItem3Update') IS NOT NULL
	DROP PROC uspDeceDRCDescripcionCasoItem3Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCDescripcionCasoItem3Update 0, 0, 0, 0
CREATE PROC uspDeceDRCDescripcionCasoItem3Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
		   crdu.descripcion=dcj.descripcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCDescripcionCasoItem3	INT '$.idDeceDRCDescripcionCasoItem3'
		,	idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		
		) as dcj
		join dbo.DeceDRCDescripcionCasoItem3  crdu ON crdu.idDeceDRCDescripcionCasoItem3 = dcj.idDeceDRCDescripcionCasoItem3
		WHERE crdu.idDeceDeteccionRemisionCaso =@id

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCDescripcionCasoItem3Delete ') IS NOT NULL
	DROP PROC uspDeceDRCDescripcionCasoItem3Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCDescripcionCasoItem3Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCDescripcionCasoItem3Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCDescripcionCasoItem3 WHERE idDeceDRCDescripcionCasoItem3 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCDescripcionCasoItem3 WHERE idDeceDRCDescripcionCasoItem3 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--==================================LISTAR===================================================================
GO
IF OBJECT_ID('[uspDeceDRCInformeSeguimientoItem10Get]') IS NOT NULL
	DROP PROC [uspDeceDRCInformeSeguimientoItem10Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCInformeSeguimientoItem10Get] '', '{"id":22}'
CREATE PROC [dbo].[uspDeceDRCInformeSeguimientoItem10Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCInformeSeguimientoItem10]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	,	drc.[fechaRegistro]
	FROM dbo.DeceDRCInformeSeguimientoItem10 drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH,WITHOUT_ARRAY_WRAPPER)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT 	'1',	'',	'',	@value AS payload
	RETURN
END

--===========================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem10Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem10Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem10Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem10Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem10( idDeceDeteccionRemisionCaso, descripcion, fechaRegistro  )
		SELECT di.idDeceDeteccionRemisionCaso, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso	INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion					VARCHAR(500) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem10 sd WHERE sd.idDeceDRCInformeSeguimientoItem10 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO

IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem10Update') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem10Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem10Update 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem10Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
	BEGIN TRAN

		UPDATE crdu
		
		SET 
		  crdu.descripcion=dcj.descripcion
	
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCInformeSeguimientoItem10	INT '$.idDeceDRCInformeSeguimientoItem10'
		,	idDeceDeteccionRemisionCaso			INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion							VARCHAR(500) '$.descripcion'
		
		) as dcj
		join dbo.DeceDRCInformeSeguimientoItem10  crdu ON crdu.idDeceDRCInformeSeguimientoItem10 = dcj.idDeceDRCInformeSeguimientoItem10
		WHERE crdu.idDeceDeteccionRemisionCaso= @id

			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem10Delete ') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem10Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCDescripcionCasoItem3Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem10Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCInformeSeguimientoItem10 WHERE idDeceDRCInformeSeguimientoItem10 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCInformeSeguimientoItem10 WHERE idDeceDRCInformeSeguimientoItem10 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
--====================================================LISTAR=================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem4OpcionGet ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem4OpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem4OpcionGet 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem4OpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT
	SELECT @id=id FROM OPENJSON (@identifierFormJson) 
	WITH(

			id INT '$.id'
	)

			SELECT 
			'1'
		,	''
		,	''
		,(SELECT	
		tr.[idDeceDRCInformeSeguimientoItem4Opcion]
	,	tr.[codigo]
	,	tr.[opcionTipo] 
	,	tr.[atributoName] 
	,	tr.[nombrePropiedad] 
	,	tr.[descripcion] 
	,	tr.[estado] 
	,	di.[idDeceDRCInformeSeguimientoItem4]  
	,	di.[fechaRegistro] 
	,	ISNULL(di.idDeceDRCInformeSeguimientoItem4,0)													AS [data.idDeceIntervencionSesionSeguimientoOpcion]
	,	CAST((CASE WHEN ISNULL(di.idDeceDRCInformeSeguimientoItem4,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	--,	ISNULL(di.descripcion,'')																				AS [data.descripcion]
	FROM dbo.DeceDRCInformeSeguimientoItem4Opcion tr
	LEFT JOIN dbo.DeceDRCInformeSeguimientoItem4 di ON di.idDeceDRCInformeSeguimientoItem4Opcion = tr.idDeceDRCInformeSeguimientoItem4Opcion
									AND di.idDeceDeteccionRemisionCaso = @id

	FOR JSON PATH ) AS payload
END

--select * from DeceDRCInformeSeguimientoItem4Opcion
--===========================================================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem4Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem4Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
--select * from DeceDRCInformeSeguimientoItem4
-- uspDeceDRCInformeSeguimientoItem4Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem4Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDeteccionRemisionCaso INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

	SELECT  @idDeceDeteccionRemisionCaso = di.idDeceDeteccionRemisionCaso 
		
		FROM OPENJSON (@dataFormJson)
		WITH(

			idDeceDeteccionRemisionCaso				INT '$.idDeceDeteccionRemisionCaso'
		
		) AS di

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem4(  idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem4Opcion, descripcion, fechaRegistro  )
		SELECT @idDeceDeteccionRemisionCaso,di.idDeceDRCInformeSeguimientoItem4Opcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.isiop')
		WITH(
			
			idDeceDRCInformeSeguimientoItem4Opcion	INT '$.idDeceDRCInformeSeguimientoItem4Opcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem4 sd WHERE sd.idDeceDRCInformeSeguimientoItem4 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem4Update') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem4Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- ============================================
-- uspDeceDRCInformeSeguimientoItem4Update '','{"id":22}','{"idDeceDRCInformeSeguimientoItem4":0,"idDeceDeteccionRemisionCaso":22,"isiop":[{"idDeceDRCInformeSeguimientoItem4Opcion":6,"codigo":6,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"seguimientoEstudiante","descripcion":"Seguimiento al estudiante","fechaRegistro":"0001-01-01T00:00:00","estado":true}],"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDRCInformeSeguimientoItem4Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)
	BEGIN TRAN
			
			DELETE dei FROM dbo.DeceDRCInformeSeguimientoItem4 dei
			WHERE dei.idDeceDeteccionRemisionCaso = @id
			AND  NOT EXISTS(
			SELECT 1 FROM OPENJSON(@dataFormJson, '$.isiop') 
			WITH ( idDeceDRCInformeSeguimientoItem4Opcion	INT '$.idDeceDRCInformeSeguimientoItem4Opcion' )	AS di
			WHERE dei.idDeceDRCInformeSeguimientoItem4Opcion = di.idDeceDRCInformeSeguimientoItem4Opcion
			)

			INSERT INTO dbo.DeceDRCInformeSeguimientoItem4( idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem4Opcion, descripcion, fechaRegistro )

			SELECT @id, di1.idDeceDRCInformeSeguimientoItem4Opcion, '', @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.isiop') 
			WITH (
				idDeceDRCInformeSeguimientoItem4Opcion	INT '$.idDeceDRCInformeSeguimientoItem4Opcion'
			)	AS di1

			WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem4 di2
				WHERE  di2.idDeceDeteccionRemisionCaso = @id
				AND di2.idDeceDRCInformeSeguimientoItem4Opcion = di1.idDeceDRCInformeSeguimientoItem4Opcion
				)
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem4Delete ') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem4Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem4Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem4Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCInformeSeguimientoItem4 WHERE idDeceDRCInformeSeguimientoItem4 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCInformeSeguimientoItem4 WHERE idDeceDRCInformeSeguimientoItem4 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--=============================================================LISTAR==================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem5OpcionGet ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem5OpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem5OpcionGet 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem5OpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT 
	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		isop.[idDeceDRCInformeSeguimientoItem5Opcion]
	,	isop.[codigo]
	,	isop.[opcionTipo]  
	,	isop.[atributoName] 
	,	isop.[nombrePropiedad]
	,	isop.[descripcion]
	,	isop.[fechaRegistro]
	,	isop.[estado]

	,	ISNULL(ia.idDeceDRCInformeSeguimientoItem5,0)													AS [data.idDeceDRCInformeSeguimientoItem5]
	,	CAST((CASE WHEN ISNULL(ia.idDeceDRCInformeSeguimientoItem5,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(ia.descripcion,'')																		AS [data.descripcion]
	
	FROM dbo.DeceDRCInformeSeguimientoItem5Opcion isop
	LEFT JOIN dbo.DeceDRCInformeSeguimientoItem5 ia ON ia.idDeceDRCInformeSeguimientoItem5Opcion = isop.idDeceDRCInformeSeguimientoItem5Opcion
										AND ia.idDeceDeteccionRemisionCaso=@id

	FOR JSON PATH ) AS payload
END
--=====================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem5Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem5Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
--select * from DeceDRCInformeSeguimientoItem5
-- uspDeceDRCInformeSeguimientoItem5Insert '', '{"idDeceDRCInformeSeguimientoItem5":0,"idDeceDeteccionRemisionCaso":23,"isop":[{"idDeceDRCInformeSeguimientoItem5Opcion":1,"codigo":1,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"comunicaRepresentante","descripcion":"Comunicacion al representante","fechaRegistro":"2022-05-09T12:24:29.033","estado":true},{"idDeceDRCInformeSeguimientoItem5Opcion":2,"codigo":2,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"firmaAcuerdo","descripcion":"Acuerdos con el respresentante","fechaRegistro":"2022-05-09T12:24:29.033","estado":true},{"idDeceDRCInformeSeguimientoItem5Opcion":7,"codigo":7,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"resuelveConflictos","descripcion":"Resuelve Conflictos","fechaRegistro":"2022-05-09T12:24:29.033","estado":true}],"dae":{"idDeceDRCAcuerdoEstablecido":0,"idDeceDeteccionRemisionCaso":0,"acuerdoPadre":"ASDASD","acuerdoAlumno":"ASDASD","fechaRegistro":"0001-01-01T00:00:00"},"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDRCInformeSeguimientoItem5Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDeteccionRemisionCaso INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN


		SELECT  @idDeceDeteccionRemisionCaso = di.idDeceDeteccionRemisionCaso 		
		FROM OPENJSON (@dataFormJson)
		WITH (
			idDeceDeteccionRemisionCaso				INT '$.idDeceDeteccionRemisionCaso'		
		) AS di

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem5(  idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem5Opcion, descripcion, fechaRegistro)
		SELECT @idDeceDeteccionRemisionCaso, di.idDeceDRCInformeSeguimientoItem5Opcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.isop')
		WITH(
			
			idDeceDRCInformeSeguimientoItem5Opcion	INT '$.idDeceDRCInformeSeguimientoItem5Opcion'

		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem5 sd WHERE sd.idDeceDRCInformeSeguimientoItem5 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		
		/*JSON abre archivos temporales (LOG), y si la sentencia no se ejecuta, salta error*/
		INSERT INTO dbo.DeceDRCAcuerdoEstablecido(idDeceDeteccionRemisionCaso, acuerdoPadre, acuerdoAlumno, fechaRegistro)
		
		SELECT @idDeceDeteccionRemisionCaso, di2.acuerdoPadre, di2.acuerdoAlumno, @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.dae')
		WITH(
			
			acuerdoPadre VARCHAR(500) '$.acuerdoPadre',
			acuerdoAlumno VARCHAR(500) '$.acuerdoAlumno'

		) AS di2

	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem5Update') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem5Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem5Update 0, '{"id":22}','{"idDeceDRCInformeSeguimientoItem5":0,"idDeceDeteccionRemisionCaso":22,"isop":[{"idDeceDRCInformeSeguimientoItem5Opcion":9,"codigo":9,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"visita","descripcion":"Visita","fechaRegistro":"2022-05-09T12:24:29.033","estado":true}],"dae":[{"idDeceDRCAcuerdoEstablecido":0,"idDeceDeteccionRemisionCaso":0,"acuerdoPadre":"asdasd","acuerdoAlumno":"asdasd","fechaRegistro":"0001-01-01T00:00:00"},{"idDeceDRCAcuerdoEstablecido":0,"idDeceDeteccionRemisionCaso":0,"acuerdoPadre":"Hola","acuerdoAlumno":"Mundo","fechaRegistro":"0001-01-01T00:00:00"}],"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC	uspDeceDRCInformeSeguimientoItem5Update	
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)
		PRINT @id
	BEGIN TRAN
		
		DELETE dei FROM dbo.DeceDRCInformeSeguimientoItem5 dei
			WHERE dei.idDeceDeteccionRemisionCaso = @id
			AND  NOT EXISTS(
			SELECT 1 FROM OPENJSON(@dataFormJson, '$.isop') 
			WITH ( idDeceDRCInformeSeguimientoItem5Opcion	INT '$.idDeceDRCInformeSeguimientoItem5Opcion' )	AS di
			WHERE dei.idDeceDRCInformeSeguimientoItem5Opcion = di.idDeceDRCInformeSeguimientoItem5Opcion
			)

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem5(idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem5Opcion, descripcion, fechaRegistro)

		SELECT @id, di1.idDeceDRCInformeSeguimientoItem5Opcion, '', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.isop') 
		WITH (
			idDeceDRCInformeSeguimientoItem5Opcion	INT '$.idDeceDRCInformeSeguimientoItem5Opcion'
		)	AS di1

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem5 di2
			WHERE  di2.idDeceDeteccionRemisionCaso = @id
			AND di2.idDeceDRCInformeSeguimientoItem5Opcion = di1.idDeceDRCInformeSeguimientoItem5Opcion
			)
		
		DELETE ae FROM dbo.DeceDRCAcuerdoEstablecido ae
		WHERE ae.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
			SELECT 1 FROM OPENJSON(@dataFormJson, '$.dae') 
			WITH ( idDeceDRCAcuerdoEstablecido	INT '$.idDeceDRCAcuerdoEstablecido' )	AS aeb
			WHERE ae.idDeceDRCAcuerdoEstablecido = aeb.idDeceDRCAcuerdoEstablecido
			)

		INSERT INTO dbo.DeceDRCAcuerdoEstablecido( idDeceDeteccionRemisionCaso, acuerdoPadre, acuerdoAlumno, fechaRegistro )
		SELECT @id, aeb.acuerdoPadre,aeb.acuerdoAlumno, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.dae') 
			WITH (
				idDeceDRCAcuerdoEstablecido	INT '$.idDeceDRCAcuerdoEstablecido',
				acuerdoPadre VARCHAR(500) '$.acuerdoPadre',
				acuerdoAlumno VARCHAR(500) '$.acuerdoAlumno'
			)	AS aeb

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCAcuerdoEstablecido aeb2
			WHERE  aeb2.idDeceDeteccionRemisionCaso = @id
			AND aeb2.idDeceDRCAcuerdoEstablecido = aeb.idDeceDRCAcuerdoEstablecido
			)
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem5Delete ') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem5Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem5Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem5Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCInformeSeguimientoItem5 WHERE idDeceDRCInformeSeguimientoItem5 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCInformeSeguimientoItem5 WHERE idDeceDRCInformeSeguimientoItem5 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


--===========================================================LISTAR====================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem7OpcionGet ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem7OpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem7OpcionGet 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem7OpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT 
SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		isop.[idDeceDRCInformeSeguimientoItem7Opcion]
	,	isop.[codigo]
	,	isop.[opcionTipo]  
	,	isop.[atributoName] 
	,	isop.[nombrePropiedad]
	,	isop.[descripcion]
	,	isop.[fechaRegistro]
	,	isop.[estado]

	,	ISNULL(ia.idDeceDRCInformeSeguimientoItem7,0)													AS [data.idDeceDRCInformeSeguimientoItem7]
	,	CAST((CASE WHEN ISNULL(ia.idDeceDRCInformeSeguimientoItem7,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(ia.descripcion,'')																		AS [data.descripcion]
	
	FROM dbo.DeceDRCInformeSeguimientoItem7Opcion isop
	LEFT JOIN dbo.DeceDRCInformeSeguimientoItem7 ia ON ia.idDeceDRCInformeSeguimientoItem7Opcion = isop.idDeceDRCInformeSeguimientoItem7Opcion
										AND ia.idDeceDeteccionRemisionCaso=@id

	FOR JSON PATH ) AS payload
END


--=====================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem7Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem7Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem7Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem7Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDeteccionRemisionCaso INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
	SELECT  @idDeceDeteccionRemisionCaso=di.idDeceDeteccionRemisionCaso 
		
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceDeteccionRemisionCaso				INT '$.idDeceDeteccionRemisionCaso'
		
		) AS di

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem7( idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem7Opcion, descripcion, fechaRegistro  )
		SELECT @idDeceDeteccionRemisionCaso,di.idDeceDRCInformeSeguimientoItem7Opcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.issop')
		WITH(
			
			idDeceDRCInformeSeguimientoItem7Opcion	INT '$.idDeceDRCInformeSeguimientoItem7Opcion'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem7 sd WHERE sd.idDeceDRCInformeSeguimientoItem7 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
		INSERT INTO dbo.DeceDRCAccionRealizarItem7(idDeceDeteccionRemisionCaso, descripcion, fechaRegistro)
		
		SELECT @idDeceDeteccionRemisionCaso, di2.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.acr')
		WITH(

			descripcion VARCHAR(500) '$.descripcion'
			
		) AS di2
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

GO

IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem7Update') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem7Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem7Update '','{"id":22}','{"idDeceDRCInformeSeguimientoItem7":0,"idDeceDeteccionRemisionCaso":22,"issop":[{"idDeceDRCInformeSeguimientoItem7Opcion":1,"codigo":1,"opcionTipo":2,"atributoName":null,"nombrePropiedad":"oracion","descripcion":"Oración","fechaRegistro":"2022-04-22T10:58:21.777","estado":true}],"acr":{"idDeceDRCAccionRealizarItem7":0,"idDeceDeteccionRemisionCaso":0,"descripcion":"asdasd","fechaRegistro":"0001-01-01T00:00:00"},"descripcion":"asdasd","fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceDRCInformeSeguimientoItem7Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id =id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)
	BEGIN TRAN
		
		DELETE dei FROM dbo.DeceDRCInformeSeguimientoItem7 dei
		WHERE dei.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
			SELECT 1 FROM OPENJSON(@dataFormJson, '$.issop') 
			WITH ( idDeceDRCInformeSeguimientoItem7Opcion	INT '$.idDeceDRCInformeSeguimientoItem7Opcion' )	AS di
			WHERE dei.idDeceDRCInformeSeguimientoItem7Opcion = di.idDeceDRCInformeSeguimientoItem7Opcion
			)
		INSERT INTO dbo.DeceDRCInformeSeguimientoItem7(idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem7Opcion, descripcion, fechaRegistro)

		SELECT @id, di1.idDeceDRCInformeSeguimientoItem7Opcion, '', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.issop') 
		WITH (
			idDeceDRCInformeSeguimientoItem7Opcion	INT '$.idDeceDRCInformeSeguimientoItem7Opcion'
		)	AS di1

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem7 di2
			WHERE  di2.idDeceDeteccionRemisionCaso = @id
			AND di2.idDeceDRCInformeSeguimientoItem7Opcion = di1.idDeceDRCInformeSeguimientoItem7Opcion
			)
		
		DELETE ae FROM dbo.DeceDRCAccionRealizarItem7 ae
		WHERE ae.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
			SELECT 1 FROM OPENJSON(@dataFormJson, '$.acr') 
			WITH ( idDeceDRCAccionRealizarItem7	INT '$.idDeceDRCAccionRealizarItem7' )	AS aeb
			WHERE ae.idDeceDRCAccionRealizarItem7 = aeb.idDeceDRCAccionRealizarItem7
			)
		INSERT INTO dbo.DeceDRCAccionRealizarItem7( idDeceDeteccionRemisionCaso,descripcion,  fechaRegistro )
		SELECT @id, aeb.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.acr') 
			WITH (
				idDeceDRCAccionRealizarItem7	INT '$.idDeceDRCAccionRealizarItem7',
				descripcion VARCHAR(500) '$.descripcion'
			)	AS aeb

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCAccionRealizarItem7 aeb2
			WHERE  aeb2.idDeceDeteccionRemisionCaso = @id
			AND aeb2.idDeceDRCAccionRealizarItem7 = aeb.idDeceDRCAccionRealizarItem7
			)
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem7Delete ') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem7Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem7Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem7Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCInformeSeguimientoItem7 WHERE idDeceDRCInformeSeguimientoItem7 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCInformeSeguimientoItem7 WHERE idDeceDRCInformeSeguimientoItem7 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--=======================================================LISTAR============================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem8OpcionGet ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem8OpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem8OpcionGet 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem8OpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT 
	SELECT @id = id
			FROM OPENJSON(@identifierFormJson) 
			WITH (
				id			INT '$.id'
			)

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		isop.[idDeceDRCInformeSeguimientoItem8Opcion]
	,	isop.[codigo]
	,	isop.[opcionTipo]  
	,	isop.[atributoName] 
	,	isop.[nombrePropiedad]
	,	isop.[descripcion]
	,	isop.[fechaRegistro]
	,	isop.[estado]

	,	ISNULL(ia.idDeceDRCInformeSeguimientoItem8,0)													AS [data.idDeceDRCInformeSeguimientoItem8]
	,	CAST((CASE WHEN ISNULL(ia.idDeceDRCInformeSeguimientoItem8,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(ia.descripcion,'')																		AS [data.descripcion]
	
	FROM dbo.DeceDRCInformeSeguimientoItem8Opcion isop
	LEFT JOIN dbo.DeceDRCInformeSeguimientoItem8 ia ON ia.idDeceDRCInformeSeguimientoItem8Opcion = isop.idDeceDRCInformeSeguimientoItem8Opcion
										AND ia.idDeceDeteccionRemisionCaso=@id

	FOR JSON PATH ) AS payload
END

--=========================================================================================================================================================
GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem8Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCInformeSeguimientoItem8Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
--select * from DeceDRCInformeSeguimientoItem8
-- uspDeceDRCInformeSeguimientoItem8Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem8Insert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDeteccionRemisionCaso INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN
	SELECT  @idDeceDeteccionRemisionCaso=di.idDeceDeteccionRemisionCaso 
		
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceDeteccionRemisionCaso				INT '$.idDeceDeteccionRemisionCaso'
		
		) AS di

		INSERT INTO dbo.DeceDRCInformeSeguimientoItem8( idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem8Opcion, descripcion, fechaRegistro  )
		SELECT @idDeceDeteccionRemisionCaso,di.idDeceDRCInformeSeguimientoItem8Opcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson,'$.issp')
		WITH(
			idDeceDRCInformeSeguimientoItem8Opcion	INT '$.idDeceDRCInformeSeguimientoItem8Opcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem8 sd WHERE sd.idDeceDRCInformeSeguimientoItem8 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			--select * from dbo.DeceDRCAcuerdosItem8
		INSERT INTO dbo.DeceDRCAcuerdosItem8(idDeceDeteccionRemisionCaso, descripcion, fechaRegistro)
		
			SELECT @idDeceDeteccionRemisionCaso, di2.descripcion, @fechaHoy
			FROM OPENJSON (@dataFormJson, '$.ace')
			WITH(

				descripcion VARCHAR(500) '$.descripcion'
			
			) AS di2

	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO

IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem8Update') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem8Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- DeceDRCInformeSeguimientoItem8 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem8Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id			INT '$.id'
		)
		PRINT @id
	BEGIN TRAN

		DELETE dei FROM dbo.DeceDRCInformeSeguimientoItem8 dei
		WHERE dei.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.issp') 
			WITH ( idDeceDRCInformeSeguimientoItem8Opcion	INT '$.idDeceDRCInformeSeguimientoItem8Opcion' )	AS di
			WHERE dei.idDeceDRCInformeSeguimientoItem8Opcion = di.idDeceDRCInformeSeguimientoItem8Opcion
		)
		
		INSERT INTO dbo.DeceDRCInformeSeguimientoItem8(idDeceDeteccionRemisionCaso, idDeceDRCInformeSeguimientoItem8Opcion, descripcion, fechaRegistro)

		SELECT @id, di1.idDeceDRCInformeSeguimientoItem8Opcion, '', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.issp') 
		WITH (
			idDeceDRCInformeSeguimientoItem8Opcion	INT '$.idDeceDRCInformeSeguimientoItem8Opcion'
		)	AS di1

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCInformeSeguimientoItem8 di2
			WHERE  di2.idDeceDeteccionRemisionCaso = @id
			AND di2.idDeceDRCInformeSeguimientoItem8Opcion = di1.idDeceDRCInformeSeguimientoItem8Opcion
			)

		DELETE ae FROM dbo.DeceDRCAcuerdosItem8 ae
		WHERE ae.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.ace') 
			WITH ( idDeceDRCAcuerdosItem8	INT '$.idDeceDRCAcuerdosItem8' )	AS aeb
			WHERE ae.idDeceDRCAcuerdosItem8 = aeb.idDeceDRCAcuerdosItem8
		)
		INSERT INTO dbo.DeceDRCAcuerdosItem8( idDeceDeteccionRemisionCaso,descripcion , fechaRegistro )
		SELECT @id,aeb.descripcion, @fechaHoy
			FROM OPENJSON(@dataFormJson, '$.ace') 
			WITH (
				idDeceDRCAcuerdosItem8	INT '$.idDeceDRCAcuerdosItem8',
				descripcion VARCHAR(500) '$.descripcion'
			)	AS aeb

		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCAcuerdosItem8 aeb2
			WHERE  aeb2.idDeceDeteccionRemisionCaso = @id
			AND aeb2.idDeceDRCAcuerdosItem8 = aeb.idDeceDRCAcuerdosItem8
			)
			
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceDRCInformeSeguimientoItem8Delete ') IS NOT NULL
	DROP PROC uspDeceDRCInformeSeguimientoItem8Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCInformeSeguimientoItem8Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCInformeSeguimientoItem8Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCInformeSeguimientoItem8 WHERE idDeceDRCInformeSeguimientoItem8 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCInformeSeguimientoItem8 WHERE idDeceDRCInformeSeguimientoItem8 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--==================================================LISTAR==========================================================================================================
GO
IF OBJECT_ID('uspDeceDRCMotivoReporteOpcionGet ') IS NOT NULL 
	DROP PROC uspDeceDRCMotivoReporteOpcionGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteOpcionGet 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteOpcionGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE    
@id INT = 0

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		mrop.[idDeceDRCMotivoReporteOpcion]
	,	mrop.[codigo]
	,	mrop.[descripcion]  
	,	mrop.[fechaRegistro] 
	,	mrop.[estado]
	
	FROM dbo.DeceDRCMotivoReporteOpcion mrop

	FOR JSON PATH ) AS payload
END
--==================================================================================================================================================================

GO
IF OBJECT_ID('uspDeceDRCMotivoReporteInsert ') IS NOT NULL 
	DROP PROC uspDeceDRCMotivoReporteInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteInsert 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceDeteccionRemisionCaso INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

	SELECT  @idDeceDeteccionRemisionCaso=di.idDeceDeteccionRemisionCaso 
		
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceDeteccionRemisionCaso				INT '$.idDeceDeteccionRemisionCaso'
		
		) AS di

		INSERT INTO dbo.DeceDRCMotivoReporte( idDeceDeteccionRemisionCaso, idDeceDRCMotivoReporteOpcionDetalle, fechaRegistro, idUsuario)
		SELECT @idDeceDeteccionRemisionCaso,di.idDeceDRCMotivoReporteOpcionDetalle, @fechaHoy, di.idUsuario
		FROM OPENJSON (@dataFormJson, '$.ropdet')
		WITH(
			
		 idDeceDRCMotivoReporteOpcionDetalle		INT '$.idDeceDRCMotivoReporteOpcionDetalle'
		,idUsuario				INT '$.idUsuario'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT * FROM dbo.DeceDRCMotivoReporte sd WHERE sd.idDeceDRCMotivoReporte = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

		--select * FROM DeceDRCMotivoReporte

	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id as payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
/****** Object:  StoredProcedure [dbo].[uspDeceDRCMotivoReporteUpdate]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('uspDeceDRCMotivoReporteUpdate') IS NOT NULL
	DROP PROC uspDeceDRCMotivoReporteUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteUpdate '',8,'{"idDeceDRCMotivoReporte":0,"idDeceDeteccionRemisionCaso":8,"ropdet":[],"fechaRegistro":"0001-01-01T00:00:00","idUsuario":0}' 
CREATE PROC uspDeceDRCMotivoReporteUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	print '1'
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT '$.id'
		) 


	BEGIN TRAN

		DELETE dei FROM dbo.DeceDRCMotivoReporte dei
		WHERE dei.idDeceDeteccionRemisionCaso = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.ropdet') 
			WITH ( idDeceDRCMotivoReporteOpcionDetalle	INT '$.idDeceDRCMotivoReporteOpcionDetalle' )	AS di
			WHERE dei.idDeceDRCMotivoReporteOpcionDetalle = di.idDeceDRCMotivoReporteOpcionDetalle
		)

		INSERT INTO dbo.DeceDRCMotivoReporte( idDeceDeteccionRemisionCaso, idDeceDRCMotivoReporteOpcionDetalle, fechaRegistro, idUsuario )

		SELECT @id, di1.idDeceDRCMotivoReporteOpcionDetalle, @fechaHoy,''
		FROM OPENJSON(@dataFormJson, '$.ropdet') 
		WITH (
			idDeceDRCMotivoReporteOpcionDetalle	INT '$.idDeceDRCMotivoReporteOpcionDetalle'
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceDRCMotivoReporte di2
			WHERE  di2.idDeceDeteccionRemisionCaso = @id
			AND di2.idDeceDRCMotivoReporteOpcionDetalle = di1.idDeceDRCMotivoReporteOpcionDetalle
			)
	
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceDRCMotivoReporteDelete ') IS NOT NULL
	DROP PROC uspDeceDRCMotivoReporteDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteDelete 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCMotivoReporte WHERE idDeceDRCMotivoReporte = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCMotivoReporte WHERE idDeceDRCMotivoReporte = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--============================================================LISTAR===============================================================================================
GO
IF OBJECT_ID('uspDeceDRCMotivoReporteOpcionDetalleGet ') IS NOT NULL 
	DROP PROC uspDeceDRCMotivoReporteOpcionDetalleGet
GO 
-- =============================================
-- Author:		Jonathan Placencia
-- Create date: 06-05-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteOpcionDetalleGet '', '{"id":23}'
CREATE PROC uspDeceDRCMotivoReporteOpcionDetalleGet
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@id INT
SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		mropd.[idDeceDRCMotivoReporteOpcionDetalle]
	,	mropd.[idDeceDRCMotivoReporteOpcion]
	,	mropd.[codigo]
	,	mropd.[opcionTipo]  
	,	mropd.[atributoName] 
	,	mropd.[nombrePropiedad]
	,	mropd.[descripcion]
	,	mropd.[fechaRegistro]
	,	mropd.[estado]
	
	,	ISNULL(ia.idDeceDRCMotivoReporte,0)													AS [data.idDeceDRCMotivoReporteOpcion]
	,	CAST((CASE WHEN ISNULL(ia.idDeceDRCMotivoReporte,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]	
	
	FROM dbo.DeceDRCMotivoReporteOpcionDetalle mropd
	
	LEFT JOIN dbo.DeceDRCMotivoReporte ia ON ia.idDeceDRCMotivoReporteOpcionDetalle = mropd.idDeceDRCMotivoReporteOpcionDetalle
										AND ia.idDeceDeteccionRemisionCaso = @id

	FOR JSON PATH ) AS payload


END

--=================================================================================================================================================================

GO
IF OBJECT_ID('uspDeceDRCMotivoReporteOpcionDetalleInsert ') IS NOT NULL 
	DROP PROC uspDeceDRCMotivoReporteOpcionDetalleInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteOpcionDetalleInsert 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteOpcionDetalleInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCMotivoReporteOpcionDetalle( idDeceDRCMotivoReporteOpcion, codigo, opcionTipo, atributoName, nombrePropiedad, descripcion, fechaRegistro, estado )
		SELECT di.idDeceDRCMotivoReporteOpcion,di.codigo, di.opcionTipo,di.atributoName,di.nombrePropiedad,di.descripcion, @fechaHoy,'1'
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDRCMotivoReporteOpcion	INT '$.idDeceDRCMotivoReporteOpcion'
		,	codigo							INT '$.idDeceDRCMotivoReporteOpcionDetalle'
		,	opcionTipo						INT '$.descripcion'
		,	atributoName					VARCHAR(50) '$.descripcion'
		,	nombrePropiedad					VARCHAR(50) '$.descripcion'
		,	descripcion						VARCHAR(50) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCMotivoReporteOpcionDetalle sd WHERE sd.idDeceDRCMotivoReporteOpcionDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO

IF OBJECT_ID('uspDeceDRCMotivoReporteOpcionDetalleUpdate') IS NOT NULL
	DROP PROC uspDeceDRCMotivoReporteOpcionDetalleUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteOpcionDetalleUpdate 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteOpcionDetalleUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	BEGIN TRAN

		UPDATE crdu
		
		SET 
			crdu.idDeceDRCMotivoReporteOpcion=dcj.idDeceDRCMotivoReporteOpcion
		,   crdu.codigo=dcj.codigo
		,   crdu.opcionTipo=dcj.opcionTipo
		,   crdu.atributoName=dcj.atributoName
		,   crdu.nombrePropiedad=dcj.nombrePropiedad
		,   crdu.descripcion=dcj.descripcion
	
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCMotivoReporteOpcionDetalle	INT '$.idDeceDRCMotivoReporteOpcionDetalle'
		,	idDeceDRCMotivoReporteOpcion		INT '$.idDeceDeteccionRemisionCaso'
		,	codigo								INT '$.idDeceDRCMotivoReporteOpcionDetalle'
		,	opcionTipo							INT '$.descripcion'
		,	atributoName						VARCHAR(50) '$.descripcion'
		,	nombrePropiedad						VARCHAR(50) '$.descripcion'
		,	descripcion							VARCHAR(50) '$.descripcion'
		
		) as dcj
		join dbo.DeceDRCMotivoReporteOpcionDetalle  crdu ON crdu.idDeceDRCMotivoReporteOpcionDetalle = dcj.idDeceDRCMotivoReporteOpcionDetalle

		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT 1 FROM dbo.DeceDRCMotivoReporteOpcionDetalle   WHERE idDeceDRCMotivoReporteOpcionDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END


GO
IF OBJECT_ID('uspDeceDRCMotivoReporteOpcionDetalleDelete ') IS NOT NULL
	DROP PROC uspDeceDRCMotivoReporteOpcionDetalleDelete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCMotivoReporteOpcionDetalleDelete 0, 0, 0, 0
CREATE PROC uspDeceDRCMotivoReporteOpcionDetalleDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCMotivoReporteOpcionDetalle WHERE idDeceDRCMotivoReporteOpcionDetalle = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCMotivoReporteOpcionDetalle WHERE idDeceDRCMotivoReporteOpcionDetalle = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END

--===================================================LISTAR===========================================================================================================
GO
IF OBJECT_ID('[uspDeceDRCObsSugerenciaItem9Get]') IS NOT NULL
	DROP PROC [uspDeceDRCObsSugerenciaItem9Get]
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- [uspDeceDRCObsSugerenciaItem9Get] '', '{"id":22}'
CREATE PROC [dbo].[uspDeceDRCObsSugerenciaItem9Get]
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT
, @value VARCHAR(MAX)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

set @value=(SELECT drc.[idDeceDRCObsSugerenciaItem9]
	,	drc.[idDeceDeteccionRemisionCaso]
	,	drc.[descripcion]
	,	drc.[fechaRegistro]
	FROM dbo.DeceDRCObsSugerenciaItem9 drc
	
	WHERE drc.idDeceDeteccionRemisionCaso= @id
		FOR JSON PATH,WITHOUT_ARRAY_WRAPPER)

	IF @value IS NULL 
	BEGIN 
		SELECT '0','',''
		RETURN
	END
	SELECT 	'1',	'',	'',	@value AS payload
	RETURN
END

--====================================================================================================================================================================

GO
IF OBJECT_ID('uspDeceDRCObsSugerenciaItem9Insert ') IS NOT NULL 
	DROP PROC uspDeceDRCObsSugerenciaItem9Insert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCObsSugerenciaItem9Insert 0, 0, 0, 0
CREATE PROC uspDeceDRCObsSugerenciaItem9Insert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN

		INSERT INTO dbo.DeceDRCObsSugerenciaItem9( idDeceDeteccionRemisionCaso, descripcion, fechaRegistro )
		SELECT di.idDeceDeteccionRemisionCaso,di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			
			idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceDRCObsSugerenciaItem9 sd WHERE sd.idDeceDRCObsSugerenciaItem9 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH

	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END




GO

IF OBJECT_ID('uspDeceDRCObsSugerenciaItem9Update') IS NOT NULL
	DROP PROC uspDeceDRCObsSugerenciaItem9Update
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCObsSugerenciaItem9Update 0, 0, 0, 0
CREATE PROC uspDeceDRCObsSugerenciaItem9Update
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
 	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)
	BEGIN TRAN

		UPDATE crdu
		
		SET 
		   crdu.descripcion=dcj.descripcion
	
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceDRCObsSugerenciaItem9		INT '$.idDeceDRCObsSugerenciaItem9'
		,	idDeceDeteccionRemisionCaso		INT '$.idDeceDeteccionRemisionCaso'
		,	descripcion						VARCHAR(500) '$.descripcion'
		
		) as dcj
		join dbo.DeceDRCObsSugerenciaItem9  crdu ON crdu.idDeceDRCObsSugerenciaItem9 = dcj.idDeceDRCObsSugerenciaItem9
		WHERE crdu.idDeceDeteccionRemisionCaso= @id

			
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



GO
IF OBJECT_ID('uspDeceDRCObsSugerenciaItem9Delete ') IS NOT NULL
	DROP PROC uspDeceDRCObsSugerenciaItem9Delete
GO 
-- =============================================
-- Author:		Jefferson Mena
-- Author2:     Jonathan Placencia
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceDRCObsSugerenciaItem9Delete 0, 0, 0, 0
CREATE PROC uspDeceDRCObsSugerenciaItem9Delete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL

AS 
BEGIN
DECLARE 
@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT  @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id INT '$.id'
	)
			
		 DELETE FROM  dbo.DeceDRCObsSugerenciaItem9 WHERE idDeceDRCObsSugerenciaItem9 = @id
				
		IF EXISTS(SELECT TOP 1 1 FROM dbo.DeceDRCObsSugerenciaItem9 WHERE idDeceDRCObsSugerenciaItem9 = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
				--VALUES	(@codigo,@opcionTipo,@nombrePropiedad,@descripcion, @fechaEc, 1)
	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id
	RETURN
END TRY 
BEGIN CATCH
	
	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END



--==============================================================================================================================================================================
--==============================================================================================================================================================================
--==============================================================================================================================================================================

GO
IF OBJECT_ID('uspDeceEstadoCivilOpcionListar') IS NOT NULL
	DROP PROC uspDeceEstadoCivilOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceEstadoCivilOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceEstadoCivilOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		it.[codEstadoCivil]
	,	it.[descripcion]
	,	it.[estado] 
	FROM dbo.EstadoCivil it
	FOR JSON AUTO ) AS payload

END
GO


GO
IF OBJECT_ID('uspDeceParentescoOpcionListar') IS NOT NULL
	DROP PROC uspDeceParentescoOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceParentescoOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceParentescoOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 

	SELECT 
		'1'
	,	''
	,	''

	,(SELECT	
		tr.[idTipoRelacion]
	,	tr.[descripcion]
	,	[posibleResponsable] = CAST(ISNULL(tr.[posibleResponsable],0) AS BIT) 
	,	tr.[estado] 
	,	tr.[codigo] 
	,	tr.[moduloDece] 
	FROM dbo.TipoRelacion tr
	WHERE tr.moduloDece = 1
	FOR JSON AUTO ) AS payload
END
GO

GO
IF OBJECT_ID('uspDeceSDInstruccionOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDInstruccionOpcionListar	
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDInstruccionOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDInstruccionOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 

	SELECT 
		'1'
	,	''
	,	''
	,(SELECT	
		it.[idDeceSDInstruccionOpcion]
	,	it.[codigo]
	,	it.[descripcion]
	,	it.[observacion]
	,	it.[estado] 
	FROM dbo.DeceSDInstruccionOpcion it
	FOR JSON AUTO ) AS payload
END

GO
IF OBJECT_ID('uspDeceSDContactoOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDContactoOpcionListar	
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDContactoOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDContactoOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT 
		ct.[idDeceSDContactoOpcion]
	,	ct.[codigo]
	,	ct.[opcionTipo]
	,	ct.[descripcion]
	,	ct.[estado]
		FROM dbo.DeceSDContactoOpcion ct
		FOR JSON AUTO ) AS payload
END

GO
IF OBJECT_ID('uspDeceSDIngresoEgresoFamiliaOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDIngresoEgresoFamiliaOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDIngresoEgresoFamiliaOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDIngresoEgresoFamiliaOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT
,	@value VARCHAR(MAX)

SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
set @value=(SELECT iet.[idDeceSDIngresoEgresoFamilia]
	,	iet.[idDeceSociodemografico]
	,	iet.[valorPadre]
	,	iet.[valorMadre]
	,	iet.[valorOtros]
	,	iet.[valorIngresos]
	,	iet.[valorEgresos]

	FROM dbo.DeceSDIngresoEgresoFamilia iet
	WHERE idDeceSociodemografico = @id
	FOR JSON PATH,WITHOUT_ARRAY_WRAPPER )

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END

	SELECT '1',	'',	'', @value AS payload
END


GO
IF OBJECT_ID('uspDeceSDViviendaCondicionOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDViviendaCondicionOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDViviendaCondicionOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDViviendaCondicionOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT

SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT vct.[idDeceSDViviendaCondicionOpcion]

	,	vct.[codigo]
	,	vct.[opcionTipo]
	,	ISNULL(vct.[atributoName],'') AS [atributoName]
	,	vct.[nombrePropiedad]
	,	vct.[descripcion]
	,	vct.[fechaRegistro]
	,	vct.[estado]
	,	ISNULL(vc.idDeceSDViviendaCondicion,0)												AS [data.idDeceSDViviendaCondicion]
	,	CAST((CASE WHEN ISNULL(vc.idDeceSDViviendaCondicion,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(vc.descripcion,'')															AS [data.descripcion]
	FROM dbo.DeceSDViviendaCondicionOpcion vct
	LEFT JOIN dbo.DeceSDViviendaCondicion vc ON	vc.idDeceSDViviendaCondicionOpcion = vct.idDeceSDViviendaCondicionOpcion
											AND vc.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END
GO

IF OBJECT_ID('uspDeceSDViviendaServicioOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDViviendaServicioOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDViviendaServicioOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDViviendaServicioOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT

SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT vst.[idDeceSDViviendaServicioOpcion]	
	,	vst.[codigo]
	,	vst.[opcionTipo]
	,	ISNULL(vst.[atributoName],'') AS [atributoName]
	,	vst.[nombrePropiedad]
	,	vst.[descripcion]
	,	vst.[fechaRegistro]
	,	vst.[estado]
	,	ISNULL(vs.idDeceSDViviendaServicio,0)													AS [data.idDeceSDIngresoEgresoFamilia]
	,	CAST((CASE WHEN ISNULL(vs.idDeceSDViviendaServicio,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(vs.descripcion,'')															AS [data.descripcion]
	FROM dbo.DeceSDViviendaServicioOpcion vst
	LEFT JOIN dbo.DeceSDViviendaServicio vs ON	vs.idDeceSDViviendaServicioOpcion = vst.idDeceSDViviendaServicioOpcion
											AND vs.idDeceSociodemografico = @id
		FOR JSON PATH ) AS payload
END

GO
IF OBJECT_ID('uspDeceSDEmbarazoPartoOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDEmbarazoPartoOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDEmbarazoPartoOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDEmbarazoPartoOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT 
SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT 
		epo.[idDeceSDEmbarazoPartoOpcion]
	,	epo.[codigo]
	,	epo.[opcionTipo]
	,	ISNULL(epo.[atributoName],'') AS [atributoName]
	,	epo.[nombrePropiedad]
	,	epo.[descripcion]
	,	epo.[fechaRegistro]
	,	epo.[estado]
	,	ISNULL(ep.idDeceSDEmbarazoParto,0)												AS [data.idDeceSDEmbarazoParto]
	,	CAST((CASE WHEN ISNULL(ep.idDeceSDEmbarazoParto,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(ep.descripcion,'')														AS [data.descripcion]
	FROM dbo.DeceSDEmbarazoPartoOpcion epo
	LEFT JOIN dbo.DeceSDEmbarazoParto ep ON	ep.idDeceSDEmbarazoPartoOpcion = epo.idDeceSDEmbarazoPartoOpcion
										AND ep.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END

GO
IF OBJECT_ID('uspDeceSDDatoNinioRecienNacidoOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDDatoNinioRecienNacidoOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoNinioRecienNacidoOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDDatoNinioRecienNacidoOpcionListar
@authClientJson NVARCHAR(MAX)
,@identifierFormJson NVARCHAR(MAX)
AS 
BEGIN 
DECLARE 
@id INT
, @value VARCHAR(MAX)

SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(id INT '$.id')

SET @value=	(SELECT dnrn.[idDeceSDDatoNinioRecienNacido]
	,	dnrn.[pesoNacer]
	,	dnrn.[tallaNacer]
	,	dnrn.[edadCaminar]
	,	dnrn.[edadHablar]
	,	dnrn.[periodoLactancia]
	,	dnrn.[edadUsoBiberon]
	,	dnrn.[edadControlEsfinter]
	,	dnrn.[sufrioEnuresis]
	,	dnrn.[fechaRegistro]
	FROM dbo.DeceSDDatoNinioRecienNacido dnrn
	WHERE dnrn.idDeceSociodemografico = @id
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
	
	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT 	'1',	'',	'', @value AS payload
	RETURN
END

GO
IF OBJECT_ID('uspDeceSDAntecedentePatologicoFamiliaOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDAntecedentePatologicoFamiliaOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDAntecedentePatologicoFamiliaOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDAntecedentePatologicoFamiliaOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE
@id INT 
SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)
	SELECT
		'1'
	,	''
	,	''
	,	(SELECT apfo.[idDeceSDAntecedentePatologicoFamiliaOpcion]
	,	apfo.[codigo]
	,	apfo.[opcionTipo]
	,	ISNULL(apfo.[atributoName],'') AS [atributoName]
	,	apfo.[nombrePropiedad]
	,	apfo.[descripcion]
	,	apfo.[fechaRegistro]
	,	apfo.[estado]
	,	ISNULL(apf.idDeceSDAntecedentePatologicoFamilia,0)												AS [data.idDeceSDAntecedentePatologicoFamilia]
	,	CAST((CASE WHEN ISNULL(apf.idDeceSDAntecedentePatologicoFamilia,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(apf.descripcion,'')																		AS [data.descripcion]
	FROM dbo.DeceSDAntecedentePatologicoFamiliaOpcion apfo
	LEFT JOIN dbo.DeceSDAntecedentePatologicoFamilia apf ON	apf.idDeceSDAntecedentePatologicoFamiliaOpcion = apfo.idDeceSDAntecedentePatologicoFamiliaOpcion
														AND apf.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END
GO

GO
IF OBJECT_ID('uspDeceSDAntecedenteDificultadEscolarOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDAntecedenteDificultadEscolarOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDAntecedenteDificultadEscolarOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDAntecedenteDificultadEscolarOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT 
SELECT @id=id FROM OPENJSON (@identifierFormJson) 
WITH(

		id INT '$.id'
)

	SELECT
		'1'
	,	''
	,	''
	,	(SELECT adeo.[idDeceSDAntecedenteDificultadEscolarOpcion]
	,	adeo.[codigo]
	,	adeo.[opcionTipo]
	,	ISNULL(adeo.[atributoName],'') AS [atributoName]
	,	adeo.[nombrePropiedad]
	,	adeo.[descripcion]
	,	adeo.[fechaRegistro]
	,	adeo.[estado]
	,	ISNULL(ade.idDeceSDAntecedenteDificultadEscolar,0)												AS [data.idDeceSDAntecedenteDificultadEscolar]
	,	CAST((CASE WHEN ISNULL(ade.idDeceSDAntecedenteDificultadEscolar,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(ade.descripcion,'')																		AS [data.descripcion]
	FROM dbo.DeceSDAntecedenteDificultadEscolarOpcion adeo
	LEFT JOIN dbo.DeceSDAntecedenteDificultadEscolar ade ON	ade.idDeceSDAntecedenteDificultadEscolarOpcion = adeo.idDeceSDAntecedenteDificultadEscolarOpcion
														AND ade.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END
GO
IF OBJECT_ID('uspDeceSDDatoSaludOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDDatoSaludOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoSaludOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDDatoSaludOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT
	
	SELECT @id = id 
	FROM OPENJSON (@identifierFormJson)
	WITH(id INT '$.id')

	SELECT
		'1'
	,	''
	,	''
	,	(SELECT dso.[idDeceSDDatoSaludOpcion]
	,	dso.[codigo]
	,	dso.[opcionTipo]
	,	ISNULL(dso.[atributoName],'') AS [atributoName]
	,	dso.[nombrePropiedad]
	,	dso.[descripcion]
	,	dso.[fechaRegistro]
	,	dso.[estado]
	,	ISNULL(ds.idDeceSDDatoSalud,0)												AS [data.idDeceSDDatoSalud]
	,	CAST((CASE WHEN ISNULL(ds.idDeceSDDatoSalud,0) = 0 THEN 0 ELSE 1 END) AS BIT) AS [data.value]
	,	ISNULL(ds.descripcion,'')													AS [data.descripcion]
	FROM dbo.DeceSDDatoSaludOpcion dso
	LEFT JOIN dbo.DeceSDDatoSalud ds ON	ds.idDeceSDDatoSaludOpcion = dso.idDeceSDDatoSaludOpcion
									AND ds.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END


GO
IF OBJECT_ID('uspDeceSDHistoriaEducacionalOpcionListar') IS NOT NULL
	DROP PROC uspDeceSDHistoriaEducacionalOpcionListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDHistoriaEducacionalOpcionListar 0, 0, 0, 0
CREATE PROC uspDeceSDHistoriaEducacionalOpcionListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT
	
	SELECT @id = id 
	FROM OPENJSON (@identifierFormJson)
	WITH(id INT '$.id')

	SELECT
		'1'
	,	''
	,	''
	,	(SELECT heo.[idDeceSDHistoriaEducacionalOpcion]
	,	heo.[codigo]
	,	heo.[opcionTipo]
	,	ISNULL(heo.[atributoName],'') AS [atributoName]
	,	heo.[nombrePropiedad]
	,	heo.[descripcion]
	,	heo.[fechaRegistro]
	,	heo.[estado]
	,	ISNULL(he.idDeceSDHistoriaEducacional,0)													AS [data.idDeceSDAntecedentePatologicoFamilia]
	,	CAST((CASE WHEN ISNULL(he.idDeceSDHistoriaEducacional,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]
	,	ISNULL(he.descripcion,'')																AS [data.descripcion]
	FROM dbo.DeceSDHistoriaEducacionalOpcion heo
	LEFT JOIN dbo.DeceSDHistoriaEducacional he ON	 he.idDeceSDHistoriaEducacionalOpcion = heo.idDeceSDHistoriaEducacionalOpcion
											AND  he.idDeceSociodemografico = @id
	FOR JSON PATH ) AS payload
END
GO
GO
IF OBJECT_ID('uspDeceSociodemograficoListar') IS NOT NULL
	DROP PROC uspDeceSociodemograficoListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSociodemograficoListar 0, 0, 0, 0
CREATE PROC uspDeceSociodemograficoListar
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
@value VARCHAR(MAX) = NULL

	

	SET @value =(SELECT 
		dsd.[idDeceSociodemografico]
	,	dsd.[codigo]
	,	dsd.[codAlumno]
	,	dsd.[curso]
	,	dsd.[fechaEntrevista]
	,	dsd.[lugarNacimiento]
	,	CAST(dsd.[fechaNacimiento] as DATE)AS fechaNacimiento
	,	dsd.[domicilio]
	,	dsd.[sector]
	,	dsd.[cambioDomicilio]
	,	dsd.[contacto]
	,	dsd.[fechaRegistro]
	,	dsd.[nombreAlumno]

	,	dsd.[idSucursal]
	,	dsd.[gestion]
	,	dsd.[idUsuario]
	,	dsd.[nombreUsuario]
	,	dsd.[idRol]
	,	dsd.[nombreRol]
	,	dsd.[idModalidad]
	,	dsd.[modalidad]
	,	dsd.[idGrado]
	,	dsd.[codigoGrado]
	,	dsd.[descripcionGrado]
	,	dsd.[idParalelo]
	,	dsd.[paralelo]
	,	dsd.[idTurno]
	,	dsd.[turno]
	FROM dbo.DeceSociodemografico dsd
	FOR JSON PATH ) 

	IF @value IS NULL
		BEGIN
			SELECT '0',	'',	''
			RETURN
		END
	SELECT '1',	'',	'',@value AS payload
	RETURN

END
--==================================================================================================================================================================
--==================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSociodemograficoDelete') IS NOT NULL
	DROP PROC uspDeceSociodemograficoDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSociodemograficoDelete '','{"id":3}'
CREATE PROC uspDeceSociodemograficoDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 

BEGIN
DECLARE 
	@id INT
,	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@message VARCHAR(500) = ''
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

SET NOCOUNT ON;

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
	FROM OPENJSON(@identifierFormJson) 
	WITH (
		id	INT '$.id'
	)

	BEGIN TRAN 

		DELETE ac FROM  dbo.DeceSDDatoFamiliarContacto ac INNER JOIN dbo.DeceSDDatoFamiliar ob
            ON ac.idDeceSDDatoFamiliar= ob.idDeceSDDatoFamiliar AND ob.idDeceSociodemografico=@id

		DELETE  FROM  dbo.DeceSDDatoFamiliarContacto  WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDDatoFamiliar WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDIngresoEgresoFamilia WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDViviendaCondicion WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDViviendaServicio WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDEmbarazoParto WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDDatoNinioRecienNacido WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDAntecedentePatologicoFamilia WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDAntecedenteDificultadEscolar WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDDatoSalud WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSDHistoriaEducacional WHERE idDeceSociodemografico = @id

		DELETE FROM  dbo.DeceSociodemografico WHERE idDeceSociodemografico = @id

		IF  EXISTS(SELECT TOP 1 1 FROM dbo.DeceSociodemografico WHERE idDeceSociodemografico = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR	
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--=====================================================================================================================================================================

GO
IF OBJECT_ID('uspDeceSDDatoIdentificacionGet') IS NOT NULL
	DROP PROC uspDeceSDDatoIdentificacionGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionGet 0, 0, 0, 0
CREATE PROC uspDeceSDDatoIdentificacionGet
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE @id INT
,@value VARCHAR(MAX)	
	SELECT @id = id 
	FROM OPENJSON (@identifierFormJson)
	WITH(id INT '$.id')

	SET @value=(SELECT 
		dsd.[idDeceSociodemografico]
	,	dsd.[codigo]
	,	dsd.[codAlumno]
	,	dsd.[curso]
	,	CAST(dsd.[fechaEntrevista] as DATE) AS fechaEntrevista
	,	dsd.[lugarNacimiento]
	,	CAST(dsd.[fechaNacimiento] as DATE) AS fechaNacimiento
	,	dsd.[domicilio]
	,	dsd.[sector]
	,	dsd.[cambioDomicilio]
	,	dsd.[fechaRegistro]
	,	dsd.[nombreAlumno]
	,	[telefono] = JSON_QUERY('[' + STUFF((SELECT ',' + '"' + sdfc.descripcion + '"' 
	--sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSociodemografico = dsd.idDeceSociodemografico
						AND sdco.codigo = 1 FOR XML PATH('')),1,1,'') + ']' )
	,	[celular] = JSON_QUERY('[' + STUFF((SELECT ',' + '"' + sdfc.descripcion + '"' 
	--sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSociodemografico = dsd.idDeceSociodemografico
						AND sdco.codigo = 2 FOR XML PATH('')),1,1,'') + ']' )
	,	dsd.[idSucursal]
	,	dsd.[gestion]
	,	dsd.[idUsuario]
	,	dsd.[nombreUsuario]
	,	dsd.[idRol]
	,	dsd.[nombreRol]
	,	dsd.[idModalidad]
	,	dsd.[modalidad]
	,	dsd.[idGrado]
	,	dsd.[codigoGrado]
	,	dsd.[descripcionGrado]
	,	dsd.[idParalelo]
	,	dsd.[paralelo]
	,	dsd.[idTurno]
	,	dsd.[turno]
	FROM dbo.DeceSociodemografico dsd
	WHERE dsd.idDeceSociodemografico = @id
	FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END
	SELECT'1',	'',	'', @value AS payload	
	RETURN
	--FROM dbo.DeceSociodemografico dsd
	--WHERE dsd.idDeceSociodemografico = @id
	--FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ),'') AS payload
END
GO

GO
IF OBJECT_ID('uspDeceSDDatoFamiliarGet') IS NOT NULL
	DROP PROC uspDeceSDDatoFamiliarGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoFamiliarGet '', '{"id":18}'
CREATE PROC uspDeceSDDatoFamiliarGet
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@value VARCHAR(MAX)
,	@id INT
,	@numeroItem int

	SELECT @id = id , @numeroItem = numeroItem
	FROM OPENJSON (@identifierFormJson)
	WITH(id INT '$.id',numeroItem  INT '$.numeroItem')

	SET @value=(SELECT sdf.[idDeceSDDatoFamiliar]
	, sdf.[idDeceSociodemografico]
	, sdf.[numeroItem]
	, sdf.[idTipoRelacion]
	, sdf.[primerApellido]
	, sdf.[segundoApellido]
	, sdf.[primerNombre]
	, sdf.[segundoNombre]
	, CAST (sdf.[fechaNacimiento] as DATE) AS fechaNacimiento
	, sdf.[idEstadoCivil]
	, sdf.[idDeceSDInstruccionOpcion]
	, sdf.[profesionOcupacion]
	, sdf.[lugarTrabajoEmpresa]
	, sdf.[ingreso]
	, sdf.[idReligion]
	,	[telefono] = JSON_QUERY('[' + STUFF((SELECT ',' + '"' + sdfc.descripcion + '"' 
	--sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSDDatoFamiliar = sdf.idDeceSDDatoFamiliar
						AND sdco.codigo = 1 FOR XML PATH('')),1,1,'') + ']' )
	,	[celular] = JSON_QUERY('[' + STUFF((SELECT ',' + '"' + sdfc.descripcion + '"' 
	--sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSDDatoFamiliar = sdf.idDeceSDDatoFamiliar
						AND sdco.codigo = 2 FOR XML PATH('')),1,1,'') + ']' )
	FROM dbo.DeceSDDatoFamiliar sdf
	WHERE sdf.idDeceSociodemografico = @id
	AND sdf.numeroItem = @numeroItem
	FOR JSON PATH )

	IF @value IS NULL 
		BEGIN 
			SELECT '0','',''
			RETURN
		END
	SELECT'1',	'',	'', @value AS payload	
	RETURN
END
GO


GO
IF OBJECT_ID('uspDeceSDReferenciaFamiliarEconomicaGet') IS NOT NULL
	DROP PROC uspDeceSDReferenciaFamiliarEconomicaGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDReferenciaFamiliarEconomicaGet 0, 0, 0, 0
CREATE PROC uspDeceSDReferenciaFamiliarEconomicaGet
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE @id INT
	
	SELECT @id = id 
	FROM OPENJSON (@identifierFormJson)
	WITH(id INT '$.id')

	SELECT
		'1'
	,	''
	,	''
	,(SELECT sdf.[idDeceSDDatoFamiliar]
	, sdf.[idDeceSociodemografico]
	, sdf.[numeroItem]
	, sdf.[idTipoRelacion]
	, sdf.[primerApellido]
	, sdf.[segundoApellido]
	, sdf.[primerNombre]
	, sdf.[segundoNombre]
	, sdf.[fechaNacimiento]
	, sdf.[idEstadoCivil]
	, sdf.[idDeceSDInstruccionOpcion]
	, sdf.[profesionOcupacion]
	, sdf.[lugarTrabajoEmpresa]
	, sdf.[ingreso]
	, sdf.[idReligion]
	,	[telefono] = (SELECT sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSDDatoFamiliar = sdf.idDeceSDDatoFamiliar
						AND sdco.codigo = 1 FOR JSON PATH)
	,	[celular] = (SELECT sdfc.idDeceSDDatoFamiliarContacto, sdfc.idDeceSDDatoFamiliar, sdfc.idDeceSDContactoOpcion, sdfc.descripcion 
						FROM dbo.DeceSDDatoFamiliarContacto sdfc 
						INNER JOIN dbo.DeceSDContactoOpcion sdco ON sdco.idDeceSDContactoOpcion = sdfc.idDeceSDContactoOpcion
						WHERE sdfc.idDeceSDDatoFamiliar = sdf.idDeceSDDatoFamiliar
						AND sdco.codigo = 2 FOR JSON PATH)
	FROM dbo.DeceSDDatoFamiliar sdf
	WHERE sdf.idDeceSociodemografico = @id
	AND sdf.numeroItem = 3
	FOR JSON PATH ) AS payload
END
GO


/* DATA ENVIADA EN LA LISTA DE OPCIONES INICIALES, AL CARGAR POR PRIMERA VEZ*/


--GO
--IF OBJECT_ID('uspDeceSDIngresoEgresoFamiliarGet') IS NOT NULL
--	DROP PROC uspDeceSDIngresoEgresoFamiliarGet
--GO
---- =============================================
---- Author:		Jefferson Mena
---- Create date: 26-04-2022 
---- Description:	
---- =============================================
---- uspDeceSDIngresoEgresoFamiliarGet 0, 0, 0, 0
--CREATE PROC uspDeceSDIngresoEgresoFamiliarGet
--@authClientJson NVARCHAR(MAX)
--,@identifierFormJson NVARCHAR(MAX)
--AS 
--BEGIN 
--DECLARE @id INT
	
--	SELECT @id = id 
--	FROM OPENJSON (@identifierFormJson)
--	WITH(id INT '$.id')

--	SELECT
--		'1'
--	,	''
--	,	''
--	,(SELECT sief.[idDeceSDIngresoEgresoFamilia]
--	, sief.[idDeceSociodemografico]
--	, sief.[idDeceSDIngresoEgresoFamiliaOpcion]
--	, sief.[valor]
--	, sief.[fechaRegistro]
--	FROM dbo.DeceSDIngresoEgresoFamilia sief
--	WHERE sief.idDeceSociodemografico = @id	
--	FOR JSON PATH
--	)
--END

/*
--========================================================================
--
--  OPERACION GUARDAR
--
--========================================================================
*/

--GO
--IF OBJECT_ID('uspDeceSDAntecedentePatologicoFamiliaOpcionGuardar') IS NOT NULL
--	DROP PROC uspDeceSDAntecedentePatologicoFamiliaOpcionGuardar
--GO
---- =============================================
---- Author:		Jefferson Mena
---- Create date: 13-04-2022 
---- Description:	
---- =============================================
---- uspDeceSDAntecedentePatologicoFamiliaOpcionGuardar 0, 0, 0, 0
--CREATE PROC uspDeceSDAntecedentePatologicoFamiliaOpcionGuardar
--@authClientJson NVARCHAR(MAX)
--,@identifierFormJson NVARCHAR(MAX)
--AS 
--BEGIN
--DECLARE @fechaEc DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
--BEGIN TRY
--	BEGIN TRAN

--		-- DELETE  FROM dbo.DeceAntecedentePatalogicoFamilia WHERE 
		
--		/*[idDeceSDAntecedentePatologicoFamilia]*/
		 
--		INSERT INTO dbo.DeceAntecedentePatalogicoFamilia ([idDeceSociodemografico], [idDeceSDAntecedentePatologicoFamiliaOpcion], [descripcion], [fechaRegistro])
--		SELECT 
--			idDeceSociodemografico, idDeceSDAntecedentePatologicoFamiliaOpcion, descripcion, @fechaEc
--		FROM OPENJSON(@json)	
--		WITH(
--				idDeceSociodemografico INT '$.idDeceSociodemografico'
--			,	idDeceSDAntecedentePatologicoFamiliaOpcion INT '$.idDeceSDAntecedentePatologicoFamiliaOpcion'
--			,	descripcion INT '$.descripcion'
--		)

--		/* VERIFY TRANSACTION DO */

--	COMMIT TRAN

--	SELECT '1', '', ''
--	RETURN
--END TRY
--BEGIN CATCH
	
--	IF @@TRANCOUNT > 0 ROLLBACK TRAN

	--INSERT INTO ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime)
	--VALUES (NEWID(), '', @@ERROR, ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),''), @fechaEc)
	
--	SELECT '0', 'Problemas en el procedimiento solicitado.. código de error: ' + CONVERT(VARCHAR, ISNULL(@@IDENTITY,0)), '(sp error)'
--	RETURN
--END CATCH
--END
--GO.
-- SELECT TOP 50 * FROM dbo.ErroresSP order by IdError desc
-- SELECT * FROM dbo.DeceSociodemografico

GO
IF OBJECT_ID('uspDeceSDDatoIdentificacionInsert') IS NOT NULL
	DROP PROC uspDeceSDDatoIdentificacionInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionInsert NULL, '{"idDeceSociodemografico":0,"codigo":"456-f-GHT-2022","codAlumno":14374,"curso":"Tercero de Bachillerato","fechaEntrevista":"2022-04-27T00:00:00","lugarNacimiento":"Sto Dgo","fechaNacimiento":"1996-05-17T00:00:00","domicilio":"Quito\t","sector":"Ponceano Alto","cambioDomicilio":"Que les importa","telefono":["0980863199"],"celular":["0980307834","0982368622"],"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSDDatoIdentificacionInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
		
		-- SELECT CAST( '1996-05-17T00:00:00' AS DATE)
		-- SELECT * FROM dbo.DeceSociodemografico 
		INSERT INTO dbo.DeceSociodemografico( codigo, codAlumno, nombreAlumno, curso, fechaEntrevista, lugarNacimiento, fechaNacimiento, domicilio, sector, cambioDomicilio, contacto, fechaRegistro, idSucursal, gestion, idUsuario, nombreUsuario, idRol, nombreRol, idModalidad, modalidad, idGrado, codigoGrado, descripcionGrado, idParalelo, paralelo, idTurno, turno)
		SELECT di.codigo, di.codAlumno,di.nombreAlumno, di.curso, CAST(di.fechaEntrevista AS DATE), di.lugarNacimiento, CAST(di.fechaNacimiento AS DATE), di.domicilio, di.sector, di.cambioDomicilio, '', @fechaHoy, @idSucursal, di.gestion, @idUsuario, @nombreUsuario, @idRol, @nombreRol, di.idModalidad, di.modalidad, di.idGrado, di.codigoGrado, di.descripcionGrado, di.idParalelo, di.paralelo, di.idTurno, di.turno
		FROM OPENJSON (@dataFormJson)
		WITH(
			codigo				VARCHAR(20) '$.codigo'
		,	codAlumno			INT '$.codAlumno'
		,	nombreAlumno		VARCHAR(500) '$.nombreAlumno'
		,	curso				VARCHAR(200) '$.curso'
		,	fechaEntrevista		VARCHAR(20) '$.fechaEntrevista'
		,	lugarNacimiento		VARCHAR(300) '$.lugarNacimiento'
		,	fechaNacimiento		VARCHAR(20) '$.fechaNacimiento'
		,	domicilio			VARCHAR(300) '$.domicilio'
		,	sector				VARCHAR(300) '$.sector'
		,	cambioDomicilio		VARCHAR(300) '$.cambioDomicilio'

 		,	gestion					INT	'$.gestion'
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'

		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSociodemografico sd WHERE sd.idDeceSociodemografico = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSociodemografico, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 1), di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.telefono') as di
		
		print 4
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSociodemografico, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 2),  di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.celular') as di
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--==============================================================================================================================================================
--==============================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDDatoIdentificacionUpdate') IS NOT NULL
	DROP PROC uspDeceSDDatoIdentificacionUpdate
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoIdentificacionUpdate NULL, '{"idDeceSociodemografico":0,"codigo":"456-f-GHT-2022","codAlumno":14374,"curso":"Tercero de Bachillerato","fechaEntrevista":"2022-04-27T00:00:00","lugarNacimiento":"Sto Dgo","fechaNacimiento":"1996-05-17T00:00:00","domicilio":"Quito\t","sector":"Ponceano Alto","cambioDomicilio":"Que les importa","telefono":["0980863199"],"celular":["0980307834","0982368622"],"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSDDatoIdentificacionUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id 
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id		INT	'$.id'
		)  

	BEGIN TRAN 
		Update df
		SET
			df.codigo				  = di.codigo				 
		,	df.codAlumno			  = di.codAlumno			 	 
		,	df.nombreAlumno			  = di.nombreAlumno
		,	df.curso				  = di.curso				 
		,	df.fechaEntrevista		  = di.fechaEntrevista		 
		,	df.lugarNacimiento		  = di.lugarNacimiento		 
		,	df.fechaNacimiento		  = di.fechaNacimiento		 
		,	df.domicilio			  = di.domicilio			 
		,	df.sector				  = di.sector				 
		,	df.cambioDomicilio		  = di.cambioDomicilio
			
 		,	df.idModalidad		=  di.idModalidad					
 		,	df.modalidad		=  di.modalidad				
 		,	df.idGrado			=  di.idGrado						
 		,	df.codigoGrado		=  di.codigoGrado					
 		,	df.descripcionGrado =  di.descripcionGrado		
 		,	df.idParalelo		=  di.idParalelo					
 		,	df.paralelo		=  di.paralelo				
		,	df.idTurno			=  di.idTurno						
		,	df.turno			=  di.turno	

		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceSociodemografico  INT '$.idDeceSociodemografico'
		,	codigo				VARCHAR(20) '$.codigo'
		,	codAlumno			INT '$.codAlumno'
		,	nombreAlumno		VARCHAR(500) '$.nombreAlumno'
		,	curso				VARCHAR(200) '$.curso'
		,	fechaEntrevista		VARCHAR(20) '$.fechaEntrevista'
		,	lugarNacimiento		VARCHAR(300) '$.lugarNacimiento'
		,	fechaNacimiento		VARCHAR(20) '$.fechaNacimiento'
		,	domicilio			VARCHAR(300) '$.domicilio'
		,	sector				VARCHAR(300) '$.sector'
		,	cambioDomicilio		VARCHAR(300) '$.cambioDomicilio'
		
 		,	idModalidad				INT	'$.idModalidad'
 		,	modalidad				VARCHAR(100) '$.modalidad'
 		,	idGrado					INT	'$.idGrado'
 		,	codigoGrado				VARCHAR(50) '$.codigoGrado'
 		,	descripcionGrado		VARCHAR(100) '$.descripcionGrado'
 		,	idParalelo				INT	'$.idParalelo'
 		,	paralelo				VARCHAR(500) '$.paralelo'
		,	idTurno					INT	'$.idTurno'
		,	turno					VARCHAR(100) '$.turno'
		) AS di
		JOIN dbo.DeceSociodemografico df ON df.idDeceSociodemografico = di.idDeceSociodemografico
		WHERE df.idDeceSociodemografico = @id
			
		DELETE dei FROM dbo.DeceSDDatoFamiliarContacto dei
		INNER JOIN dbo.DeceSDContactoOpcion fo ON fo.idDeceSDContactoOpcion = dei.idDeceSDContactoOpcion
		WHERE dei.idDeceSociodemografico = @id  AND fo.codigo = 1
	
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSociodemografico, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 1), di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.telefono') as di

		print 5
		DELETE dei FROM dbo.DeceSDDatoFamiliarContacto dei
		INNER JOIN dbo.DeceSDContactoOpcion fo ON fo.idDeceSDContactoOpcion = dei.idDeceSDContactoOpcion
		WHERE dei.idDeceSociodemografico = @id AND fo.codigo = 2

		print 6
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSociodemografico, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 2),  di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.celular') as di

	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--SELECT * FROM DeceSDDatoFamiliar
--=============================================================================================
--==========================================================================================
--===============================================================================================

GO
IF OBJECT_ID('uspDeceSDDatoFamiliarInsert') IS NOT NULL
	DROP PROC uspDeceSDDatoFamiliarInsert
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoFamiliarInsert '','{"idDeceSDDatoFamiliar":0,"idDeceSociodemografico":0,"numeroItem":2,"idTipoRelacion":12,"primerApellido":"Calderon","segundoApellido":"C","primerNombre":"Francisca","segundoNombre":"F","fechaNacimiento":"2021-01-01T00:00:00","idEstadoCivil":3,"idDeceSDInstruccionOpcion":1,"profesionOcupacion":"xxxxxxxxxxxxxxxx","lugarTrabajoEmpresa":"xxxxxxxxxxxxxxxxxx","ingreso":200.0,"idReligion":1,"telefono":["xxxxxx","yyyyy","zzzzz"],"celular":["xxxxxx","yyyyy","zzzzz"]}'
CREATE PROC uspDeceSDDatoFamiliarInsert
 @authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 
			 print 1

		INSERT INTO dbo.DeceSDDatoFamiliar ([idDeceSociodemografico], [numeroItem], [idTipoRelacion], [primerApellido], [segundoApellido], [primerNombre], [segundoNombre], [fechaNacimiento], [idEstadoCivil], [idDeceSDInstruccionOpcion], [profesionOcupacion], [lugarTrabajoEmpresa], [ingreso], [idReligion])
		SELECT di.idDeceSociodemografico, di.numeroItem, di.idTipoRelacion, di.primerApellido, di.segundoApellido , di.primerNombre, di.segundoNombre,CAST(di.fechaNacimiento as DATE), di.idEstadoCivil, di.idDeceSDInstruccionOpcion,di.profesionOcupacion, di.lugarTrabajoEmpresa, di.ingreso, di.idReligion
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico		INT	'$.idDeceSociodemografico'
		,	numeroItem				INT	'$.numeroItem'
		,	idTipoRelacion				INT	'$.idTipoRelacion'
		,	primerApellido					VARCHAR(20)	'$.primerApellido'
		,	segundoApellido			VARCHAR(20) '$.segundoApellido'
		,	primerNombre					VARCHAR(20) '$.primerNombre'
		,	segundoNombre   VARCHAR(20) '$.segundoNombre'
		,	fechaNacimiento				VARCHAR(20) '$.fechaNacimiento'
		,	idEstadoCivil		INT '$.idEstadoCivil'
		
		,	idDeceSDInstruccionOpcion				INT '$.idDeceSDInstruccionOpcion'
		,	profesionOcupacion			VARCHAR(500) '$.profesionOcupacion'
		,	lugarTrabajoEmpresa			VARCHAR(500) '$.lugarTrabajoEmpresa'
		,	ingreso						DECIMAL(18,5) '$.ingreso'
		,	idReligion					INT '$.idReligion'
		) AS di 
		print 2
		SET @id = @@IDENTITY

		IF NOT EXISTS(SELECT * FROM dbo.DeceSDDatoFamiliar ddpd WHERE ddpd.idDeceSDDatoFamiliar = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
			print 3
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSDDatoFamiliar, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 1), di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.telefono') as di
		
		print 4
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSDDatoFamiliar, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 2),  di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.celular') as di
		
		print 5
	COMMIT TRAN

		SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
print 6
	SET @message = 'Problemas al guardar los cambios' + ERROR_MESSAGE()
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		print 7

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--=============================================================================================
--==========================================================================================
--===============================================================================================

GO
IF OBJECT_ID('uspDeceSDDatoFamiliarUpdate') IS NOT NULL
	DROP PROC uspDeceSDDatoFamiliarUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoFamiliarUpdate '','{"id":18}','{"idDeceSDDatoFamiliar":13,"idDeceSociodemografico":18,"numeroItem":2,"idTipoRelacion":12,"primerApellido":"bbbbbbbbbbbbbbbbbbbbbbbbbbbbb","segundoApellido":"Cyyyyyyyyyyyy","primerNombre":"bbbbbbbbbbbbbbbbbb","segundoNombre":"Fyyyyyyyyyyyyyyyyyyy","fechaNacimiento":"2021-01-01T00:00:00","idEstadoCivil":3,"idDeceSDInstruccionOpcion":1,"profesionOcupacion":"xxxxxxxxxxxxxxxx","lugarTrabajoEmpresa":"xxxxxxxxxxxxxxxxxx","ingreso":200.0,"idReligion":1,"telefono":["xxxxxx","yyyyy","zzzzz"],"celular":["xxxxxx","yyyyy","zzzzz"]}'
CREATE PROC uspDeceSDDatoFamiliarUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

		SELECT @id = d.id 
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id		INT	'$.id'
		) AS d 

		SELECT @id = d.id 
		FROM OPENJSON(@dataFormJson) 
		WITH (
			id		INT	'$.idDeceSDDatoFamiliar'
		) AS d 

	BEGIN TRAN 
			 print 1


		print @id


		
		UPDATE df
		SET
		df.numeroItem = di.numeroItem,
		df.idTipoRelacion = di.idTipoRelacion,
		df.primerApellido = di.primerApellido,
		df.segundoApellido = di.segundoApellido ,
		df.primerNombre = di.primerNombre,
		df.segundoNombre = di.segundoNombre,
		df.fechaNacimiento = CAST(di.fechaNacimiento as DATE),
		df.idEstadoCivil = di.idEstadoCivil,
		df.idDeceSDInstruccionOpcion = di.idDeceSDInstruccionOpcion,
		df.profesionOcupacion= di.profesionOcupacion,
		df.lugarTrabajoEmpresa = di.lugarTrabajoEmpresa,
		df.ingreso = di.ingreso,
		df.idReligion = di.idReligion
		
		FROM OPENJSON(@dataFormJson) 
		WITH (
			
			idDeceSociodemografico		INT	'$.idDeceSociodemografico'
		,	numeroItem				INT	'$.numeroItem'
		,	idTipoRelacion				INT	'$.idTipoRelacion'
		,	primerApellido					VARCHAR(20)	'$.primerApellido'
		,	segundoApellido			VARCHAR(20) '$.segundoApellido'
		,	primerNombre					VARCHAR(20) '$.primerNombre'
		,	segundoNombre   VARCHAR(20) '$.segundoNombre'
		,	fechaNacimiento				VARCHAR(20) '$.fechaNacimiento'
		,	idEstadoCivil		INT '$.idEstadoCivil'
		
		,	idDeceSDInstruccionOpcion				INT '$.idDeceSDInstruccionOpcion'
		,	profesionOcupacion			VARCHAR(500) '$.profesionOcupacion'
		,	lugarTrabajoEmpresa			VARCHAR(500) '$.lugarTrabajoEmpresa'
		,	ingreso						DECIMAL(18,5) '$.ingreso'
		,	idReligion					INT '$.idReligion'
		) AS di 
		JOIN dbo.DeceSDDatoFamiliar df ON df.idDeceSociodemografico = di.idDeceSociodemografico
		WHERE df.idDeceSDDatoFamiliar = @id

		
			print 3
		DELETE dei FROM dbo.DeceSDDatoFamiliarContacto dei
		INNER JOIN dbo.DeceSDContactoOpcion fo ON fo.idDeceSDContactoOpcion = dei.idDeceSDContactoOpcion
		WHERE dei.idDeceSDDatoFamiliar = @id  AND fo.codigo = 1
		print 4
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSDDatoFamiliar, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 1), di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.telefono') as di
		
		print 5
		DELETE dei FROM dbo.DeceSDDatoFamiliarContacto dei
		INNER JOIN dbo.DeceSDContactoOpcion fo ON fo.idDeceSDContactoOpcion = dei.idDeceSDContactoOpcion
		WHERE dei.idDeceSDDatoFamiliar = @id AND fo.codigo = 2

		print 6
		INSERT INTO dbo.DeceSDDatoFamiliarContacto ( idDeceSDDatoFamiliar, idDeceSDContactoOpcion, descripcion, fechaRegistro)
		SELECT @id, (SELECT TOP 1 idDeceSDContactoOpcion FROM DeceSDContactoOpcion WHERE codigo = 2),  di.value, @fechaHoy
		FROM OPENJSON(@dataFormJson,'$.celular') as di
		
		print 7
	COMMIT TRAN

		SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
print 8
	SET @message = 'Problemas al guardar los cambios' + ERROR_MESSAGE()
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		print 9

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--====================================================================================================================
--====================================================================================================================
GO
IF OBJECT_ID('uspDeceSDDatoFamiliarDelete') IS NOT NULL
	DROP PROC uspDeceSDDatoFamiliarDelete
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoFamiliarDelete '','{"id":18}','{"idDeceSDDatoFamiliar":13,"idDeceSociodemografico":18,"numeroItem":2,"idTipoRelacion":12,"primerApellido":"bbbbbbbbbbbbbbbbbbbbbbbbbbbbb","segundoApellido":"Cyyyyyyyyyyyy","primerNombre":"bbbbbbbbbbbbbbbbbb","segundoNombre":"Fyyyyyyyyyyyyyyyyyyy","fechaNacimiento":"2021-01-01T00:00:00","idEstadoCivil":3,"idDeceSDInstruccionOpcion":1,"profesionOcupacion":"xxxxxxxxxxxxxxxx","lugarTrabajoEmpresa":"xxxxxxxxxxxxxxxxxx","ingreso":200.0,"idReligion":1,"telefono":["xxxxxx","yyyyy","zzzzz"],"celular":["xxxxxx","yyyyy","zzzzz"]}'
CREATE PROC uspDeceSDDatoFamiliarDelete
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

		SELECT @id = d.id 
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id		INT	'$.id'
		) AS d 


	BEGIN TRAN 
			
		DELETE dei FROM dbo.DeceSDDatoFamiliarContacto dei
		WHERE dei.idDeceSDDatoFamiliar = @id

		DELETE dei FROM dbo.DeceSDDatoFamiliar dei
		WHERE dei.idDeceSDDatoFamiliar = @id

	COMMIT TRAN

		SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH	
print 8
	SET @message = 'Problemas al guardar los cambios' + ERROR_MESSAGE()
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		print 9

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 
		
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--==============================================================================
--======================================================================================
--============================

GO
IF OBJECT_ID('uspDeceSDReferenciaSocioeconomicaInsert') IS NOT NULL
	DROP PROC uspDeceSDReferenciaSocioeconomicaInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDReferenciaSocioeconomicaInsert NULL, '{"idDeceSDIngresoEgresoFamilia":0,"idDeceSociodemografico":19,"ingresoEgresoFamilia":[{"idDeceSDIngresoEgresoFamiliaOpcion":1,"codigo":1,"opcionTipo":0,"atributoName":"","nombrePropiedad":"padre","descripcion":"Padre","fechaRegistro":"2022-04-22T10:12:09.207","estado":true,"valor":10.0},{"idDeceSDIngresoEgresoFamiliaOpcion":2,"codigo":2,"opcionTipo":0,"atributoName":"","nombrePropiedad":"madre","descripcion":"Madre","fechaRegistro":"2022-04-22T10:12:09.21","estado":true,"valor":0.0},{"idDeceSDIngresoEgresoFamiliaOpcion":3,"codigo":3,"opcionTipo":0,"atributoName":"","nombrePropiedad":"otros","descripcion":"Otros","fechaRegistro":"2022-04-22T10:12:09.21","estado":true,"valor":0.0},{"idDeceSDIngresoEgresoFamiliaOpcion":4,"codigo":4,"opcionTipo":0,"atributoName":"","nombrePropiedad":"totalIngreso","descripcion":"Total Ingreso","fechaRegistro":"2022-04-22T10:12:09.21","estado":true,"valor":0.0},{"idDeceSDIngresoEgresoFamiliaOpcion":5,"codigo":5,"opcionTipo":0,"atributoName":"","nombrePropiedad":"totalEgresos","descripcion":"Total Egresos","fechaRegistro":"2022-04-22T10:12:09.21","estado":true,"valor":0.0}],"valor":10.0,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSDReferenciaSocioeconomicaInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 

		SELECT @idDeceSociodemografico = di.idDeceSociodemografico
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico							INT '$.idDeceSociodemografico'
		
		)	AS di
		
		print 1
		INSERT INTO [dbo].[DeceSDIngresoEgresoFamilia] ( idDeceSociodemografico, valorPadre, valorMadre, valorOtros, valorIngresos, valorEgresos, fechaRegistro )
		SELECT  @idDeceSociodemografico, CAST(di.valorPadre AS decimal(18,5)),CAST(di.valorMadre AS decimal(18,5)),CAST(di.valorOtros AS decimal(18,5)),CAST(di.valorIngresos AS decimal(18,5)),CAST(di.valorEgresos AS decimal(18,5)), @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceSDIngresoEgresoFamiliaOpcion INT '$.idDeceSDIngresoEgresoFamiliaOpcion'
		,	valorPadre VARCHAR(20) '$.valorPadre'
		,	valorMadre VARCHAR(20) '$.valorMadre'
		,	valorOtros VARCHAR(20) '$.valorOtros'
		,	valorIngresos VARCHAR(20) '$.valorIngresos'
		,	valorEgresos VARCHAR(20) '$.valorEgresos'
		) AS di
	
		print 2
		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDIngresoEgresoFamilia sd WHERE sd.idDeceSDIngresoEgresoFamilia = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

		INSERT INTO [dbo].[DeceSDViviendaCondicion] (idDeceSociodemografico, idDeceSDViviendaCondicionOpcion, descripcion, fechaRegistro )
		SELECT  di.idDeceSociodemografico, di.idDeceSDViviendaCondicionOpcion, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceSociodemografico				INT '$.idDeceSociodemografico'
		,	idDeceSDViviendaCondicionOpcion				INT '$.idDeceSDViviendaCondicionOpcion'
		,	descripcion		VARCHAR(500) '$.descripcion'
		
		) AS di


		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDViviendaCondicion sd WHERE sd.idDeceSDViviendaCondicion = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END

	   
		INSERT INTO [dbo].[DeceSDViviendaServicio] (idDeceSociodemografico, idDeceSDViviendaServicioOpcion, descripcion, fechaRegistro)
		SELECT   @idDeceSociodemografico, di.idDeceSDViviendaServicioOpcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.servicio')
		WITH(
			idDeceSociodemografico				INT '$.idDeceSociodemografico'
		,	idDeceSDViviendaServicioOpcion				INT '$.idDeceSDViviendaServicioOpcion'
		
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDViviendaServicio sd WHERE sd.idDeceSDViviendaServicio = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--================================================================================================================================================================
--=======================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDReferenciaSocioeconomicaUpdate') IS NOT NULL 
	DROP PROC uspDeceSDReferenciaSocioeconomicaUpdate
GO 
-- =============================================
-- Author:		Jefferson Mena 
-- Author2:		Jairo Pilliza
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDReferenciaSocioeconomicaUpdate 0, 0, 0, 0
CREATE PROC uspDeceSDReferenciaSocioeconomicaUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY

	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	BEGIN TRAN 
	
		UPDATE ddo
		
		SET	ddo.valorPadre = dj.valorPadre
		,	ddo.valorMadre = dj.valorMadre
		,	ddo.valorOtros = dj.valorOtros
		,	ddo.valorIngresos = dj.valorIngresos
		,	ddo.valorEgresos = dj.valorEgresos

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSDIngresoEgresoFamilia INT '$.idDeceSDIngresoEgresoFamilia'
		,	valorPadre		VARCHAR(20) '$.valorPadre'
		,	valorMadre		VARCHAR(20) '$.valorMadre'
		,	valorOtros		VARCHAR(20) '$.valorOtros'
		,	valorIngresos	VARCHAR(20) '$.valorIngresos'
		,	valorEgresos	VARCHAR(20) '$.valorEgresos'
		
		) as dj
		join dbo.DeceSDIngresoEgresoFamilia ddo ON ddo.idDeceSDIngresoEgresoFamilia = dj.idDeceSDIngresoEgresoFamilia
		WHERE ddo.idDeceSociodemografico=@id
		

		UPDATE dd
		
		SET
			dd.idDeceSDViviendaCondicionOpcion = dij.idDeceSDViviendaCondicionOpcion

		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico INT '$.idDeceSociodemografico'
		,	idDeceSDViviendaCondicionOpcion	INT '$.idDeceSDViviendaCondicionOpcion'
		) as dij
		join dbo.DeceSDViviendaCondicion dd ON dd.idDeceSociodemografico = dij.idDeceSociodemografico
		WHERE dd.idDeceSociodemografico=@id

		DELETE dei FROM dbo.DeceSDViviendaServicio dei
		WHERE dei.idDeceSociodemografico = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.servicio') 
			WITH ( idDeceSDViviendaServicioOpcion	INT '$.idDeceSDViviendaServicioOpcion' )	AS di
			WHERE dei.idDeceSDViviendaServicioOpcion = di.idDeceSDViviendaServicioOpcion
		)

		INSERT INTO dbo.DeceSDViviendaServicio( idDeceSociodemografico, idDeceSDViviendaServicioOpcion, descripcion, fechaRegistro  )

		SELECT @id, di1.idDeceSDViviendaServicioOpcion,di1.descripcion, @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.servicio') 
		WITH (
			idDeceSDViviendaServicioOpcion	INT '$.idDeceSDViviendaServicioOpcion',
			descripcion VARCHAR(500) '$.descripcion'
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceSDViviendaServicio di2
			WHERE  di2.idDeceSociodemografico = @id
			AND di2.idDeceSDViviendaServicioOpcion = di1.idDeceSDViviendaServicioOpcion
			)
		print '4'
			

	COMMIT TRAN

	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY 
BEGIN CATCH
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN

        INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
        VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	 

		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--===================================================================================================
--========================Listar de Genero ============================================================
--=================================================================================================
GO
IF OBJECT_ID('uspGeneroGet') IS NOT NULL
	DROP PROC uspGeneroGet
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspGeneroGet 0, 0, 0, 0
CREATE PROC [dbo].[uspGeneroGet]
@authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE
@id INT 

		SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	SELECT 
		'1'
	,	''
	,	''
	,	(SELECT g.[codGenero]
	,	g.[descripcion]
	,	g.[cod]
	,	g.[estado]
	,	ISNULL(vs.idDeceDerivacionDatoPersonalDerivado,0)													AS [data.codGenero]
	,	CAST((CASE WHEN ISNULL(vs.idDeceDerivacionDatoPersonalDerivado,0) = 0 THEN 0 ELSE 1 END) AS BIT)	AS [data.value]												
	FROM dbo.Genero g
	LEFT JOIN dbo.DeceDerivacionDatoPersonalDerivado vs ON	vs.idGenero = g.CodGenero
											AND vs.idDeceDerivacion = @id
	
		FOR JSON PATH ) AS payload
END

--================================================================================================================================================================
--================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDEmbarazoPartoInsert') IS NOT NULL
	DROP PROC uspDeceSDEmbarazoPartoInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDEmbarazoPartoInsert NULL, ''
CREATE PROC uspDeceSDEmbarazoPartoInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 

		SELECT @idDeceSociodemografico = di.idDeceSociodemografico
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico							INT '$.idDeceSociodemografico'
		)	AS di

		--select *from DeceSDDatoNinioRecienNacido where idDeceSociodemografico=18
		INSERT INTO [dbo].[DeceSDEmbarazoParto](idDeceSociodemografico, idDeceSDEmbarazoPartoOpcion, descripcion, fechaRegistro)
		SELECT  @idDeceSociodemografico, di.idDeceSDEmbarazoPartoOpcion, di.descripcion, @fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceSDEmbarazoPartoOpcion	INT '$.idDeceSDEmbarazoPartoOpcion'
		,	descripcion					VARCHAR(500) '$.descripcion'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDEmbarazoParto sd WHERE sd.idDeceSDEmbarazoParto = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
		
			INSERT INTO [dbo].[DeceSDDatoNinioRecienNacido](idDeceSociodemografico, pesoNacer, tallaNacer, edadCaminar, edadHablar, periodoLactancia, edadUsoBiberon, edadControlEsfinter, sufrioEnuresis, fechaRegistro)
		SELECT  @idDeceSociodemografico, hu.pesoNacer, hu.tallaNacer,hu.edadCaminar, hu.edadHablar,hu.periodoLactancia, hu.edadUsoBiberon,hu.edadControlEsfinter, hu.sufrioEnuresis,@fechaHoy
		FROM OPENJSON (@dataFormJson)
		WITH(
			pesoNacer VARCHAR(100) '$.pesoNacer'
		,	tallaNacer VARCHAR(100) '$.tallaNacer'
		,	edadCaminar VARCHAR(100)	'$.edadCaminar'
		,	edadHablar VARCHAR(100) '$.edadHablar'
		,	periodoLactancia VARCHAR(100) '$.periodoLactancia'
		,	edadUsoBiberon VARCHAR(100) '$.edadUsoBiberon'
		,	edadControlEsfinter VARCHAR(100) '$.edadControlEsfinter'
		,	sufrioEnuresis VARCHAR(3000) '$.sufrioEnuresis'
		) AS hu


		INSERT INTO [dbo].[DeceSDAntecedentePatologicoFamilia] (idDeceSociodemografico, idDeceSDAntecedentePatologicoFamiliaOpcion, descripcion, fechaRegistro )
		SELECT   @idDeceSociodemografico, di3.idDeceSDAntecedentePatologicoFamiliaOpcion,'', @fechaHoy
		FROM OPENJSON (@dataFormJson,'$.antep')
		WITH(
			idDeceSDAntecedentePatologicoFamiliaOpcion		int '$.idDeceSDAntecedentePatologicoFamiliaOpcion'
		) AS di3

		INSERT INTO [dbo].[DeceSDAntecedenteDificultadEscolar] (idDeceSociodemografico, idDeceSDAntecedenteDificultadEscolarOpcion, descripcion, fechaRegistro)
		SELECT   @idDeceSociodemografico, di4.idDeceSDAntecedenteDificultadEscolarOpcion,'', @fechaHoy
		FROM OPENJSON (@dataFormJson, '$.antecedenteEducacional')
		WITH(
			idDeceSDAntecedenteDificultadEscolarOpcion		int '$.idDeceSDAntecedenteDificultadEscolarOpcion'
		) AS di4

	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--==============================================================================================================================================================
--==============================================================================================================================================================
--==============================================================================================================================================================

GO
IF OBJECT_ID('uspDeceSDEmbarazoPartoUpdate') IS NOT NULL
	DROP PROC uspDeceSDEmbarazoPartoUpdate
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDEmbarazoPartoUpdate '', '{"id":1007}','{"idDeceSDEmbarazoParto":0,"idDeceSociodemografico":1007,"idDeceSDEmbarazoPartoOpcion":6,"idDeceSDDatoNinioRecienNacido":1,"antep":[{"idDeceSDAntecedentePatologicoFamiliaOpcion":1,"codigo":1,"opcionTipo":4,"atributoName":"","nombrePropiedad":"diabetes","descripcion":"Diabetes","fechaRegistro":"2022-06-02T07:51:42.61","estado":true},{"idDeceSDAntecedentePatologicoFamiliaOpcion":4,"codigo":4,"opcionTipo":4,"atributoName":"","nombrePropiedad":"obesidad","descripcion":"Obesidad","fechaRegistro":"2022-06-02T07:51:42.61","estado":true},{"idDeceSDAntecedentePatologicoFamiliaOpcion":12,"codigo":12,"opcionTipo":4,"atributoName":"","nombrePropiedad":"paralisis","descripcion":"Parálisis","fechaRegistro":"2022-06-02T07:51:42.61","estado":true}],"antecedenteEducacional":[{"idDeceSDAntecedenteDificultadEscolarOpcion":8,"codigo":8,"opcionTipo":2,"atributoName":"","nombrePropiedad":"problemaAuditivo","descripcion":"Problemas en discriminación auditiva","fechaRegistro":"2022-06-02T07:51:42.613","estado":true}],"descripcion":null,"pesoNacer":"asd","tallaNacer":"12","edadCaminar":"asd","edadHablar":"asd","periodoLactancia":"asd","edadUsoBiberon":"asd","edadControlEsfinter":"asd","sufrioEnuresis":"asd","fechaRegistro":"2022-06-07T16:58:43.907"}'
-- select * from DeceSDDatoNinioRecienNacido
CREATE PROC uspDeceSDEmbarazoPartoUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	BEGIN TRAN 

	print '11'
		update eb
		set eb.idDeceSDEmbarazoPartoOpcion = di.idDeceSDEmbarazoPartoOpcion

		FROM OPENJSON (@dataFormJson)
		WITH(
			idDeceSDEmbarazoPartoOpcion	INT '$.idDeceSDEmbarazoPartoOpcion'
		,	descripcion					VARCHAR(500) '$.descripcion'
		) AS di
		join dbo.DeceSDEmbarazoParto eb ON eb.idDeceSociodemografico=@id
		where eb.idDeceSociodemografico = @id

	print '10'
		UPDATE ddo
		
		SET	ddo.pesoNacer = dj.pesoNacer
		,	ddo.tallaNacer = dj.tallaNacer
		,	ddo.edadCaminar = dj.edadCaminar
		,	ddo.edadHablar = dj.edadHablar
		,	ddo.periodoLactancia = dj.periodoLactancia
		,	ddo.edadUsoBiberon = dj.edadUsoBiberon
		,	ddo.edadControlEsfinter = dj.edadControlEsfinter
		,	ddo.sufrioEnuresis = dj.sufrioEnuresis
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSDDatoNinioRecienNacido INT '$.idDeceSDDatoNinioRecienNacido'
		,	pesoNacer VARCHAR(100) '$.pesoNacer'
		,	tallaNacer VARCHAR(100) '$.tallaNacer'
		,	edadCaminar VARCHAR(100)	'$.edadCaminar'
		,	edadHablar VARCHAR(100) '$.edadHablar'
		,	periodoLactancia VARCHAR(100) '$.periodoLactancia'
		,	edadUsoBiberon VARCHAR(100) '$.edadUsoBiberon'
		,	edadControlEsfinter VARCHAR(100) '$.edadControlEsfinter'
		,	sufrioEnuresis VARCHAR(3000) '$.sufrioEnuresis'
	
		) as dj
		join dbo.DeceSDDatoNinioRecienNacido ddo ON ddo.idDeceSDDatoNinioRecienNacido = dj.idDeceSDDatoNinioRecienNacido
		WHERE ddo.idDeceSociodemografico=@id
		
		print '3'
		

		DELETE dei FROM dbo.DeceSDAntecedentePatologicoFamilia dei
		WHERE dei.idDeceSociodemografico = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.antep') 
			WITH ( idDeceSDAntecedentePatologicoFamiliaOpcion	INT '$.idDeceSDAntecedentePatologicoFamiliaOpcion' )	AS di
			WHERE dei.idDeceSDAntecedentePatologicoFamiliaOpcion = di.idDeceSDAntecedentePatologicoFamiliaOpcion
		)
		print '4'
		INSERT INTO dbo.DeceSDAntecedentePatologicoFamilia( idDeceSociodemografico, idDeceSDAntecedentePatologicoFamiliaOpcion, descripcion, fechaRegistro)

		SELECT @id, di1.idDeceSDAntecedentePatologicoFamiliaOpcion,'', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.antep') 
		WITH (
			idDeceSDAntecedentePatologicoFamiliaOpcion	INT '$.idDeceSDAntecedentePatologicoFamiliaOpcion'
			
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceSDAntecedentePatologicoFamilia di2
			WHERE  di2.idDeceSociodemografico = @id
			AND di2.idDeceSDAntecedentePatologicoFamiliaOpcion = di1.idDeceSDAntecedentePatologicoFamiliaOpcion
			)
			print '5'
		DELETE de FROM dbo.DeceSDAntecedenteDificultadEscolar de
		WHERE de.idDeceSociodemografico = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.antecedenteEducacional') 
			WITH ( idDeceSDAntecedenteDificultadEscolarOpcion INT '$.idDeceSDAntecedenteDificultadEscolarOpcion' )	AS do
			WHERE de.idDeceSDAntecedenteDificultadEscolarOpcion = do.idDeceSDAntecedenteDificultadEscolarOpcion
		)

		print '6'
		INSERT INTO dbo.DeceSDAntecedenteDificultadEscolar(idDeceSociodemografico, idDeceSDAntecedenteDificultadEscolarOpcion, descripcion, fechaRegistro)

		SELECT @id, di1.idDeceSDAntecedenteDificultadEscolarOpcion,'', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.antecedenteEducacional') 
		WITH (
			idDeceSDAntecedenteDificultadEscolarOpcion	INT '$.idDeceSDAntecedenteDificultadEscolarOpcion'
			
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceSDAntecedenteDificultadEscolar di2
			WHERE  di2.idDeceSociodemografico = @id
			AND di2.idDeceSDAntecedenteDificultadEscolarOpcion = di1.idDeceSDAntecedenteDificultadEscolarOpcion
			)
		print '7'
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO


--===============================================================================================================================================================
--===============================================================================================================================================================
--===============================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDDatoSaludInsert') IS NOT NULL
	DROP PROC uspDeceSDDatoSaludInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDDatoSaludInsert '', '{"idDeceSDDatoSalud":0,"idDeceSociodemografico":17,"datoS":[{"idDeceSDDatoSaludOpcion":1,"codigo":1,"opcionTipo":4,"atributoName":"","nombrePropiedad":"tieneDiscapacidad","descripcion":"El estudiante tiene algún tipo de discapacidad","fechaRegistro":"2022-04-22T10:36:52.453","estado":true},{"idDeceSDDatoSaludOpcion":11,"codigo":11,"opcionTipo":4,"atributoName":"","nombrePropiedad":"familiarTieneDiscapacidad","descripcion":"Familiares con algún tipo de discapacidad","fechaRegistro":"2022-04-22T10:36:52.453","estado":true}],"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSDDatoSaludInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 

		SELECT @idDeceSociodemografico = di.idDeceSociodemografico
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico							INT '$.idDeceSociodemografico'
		)	AS di

		--select *from [DeceSDDatoSalud] where idDeceSociodemografico=18
		INSERT INTO [dbo].[DeceSDDatoSalud](idDeceSociodemografico, idDeceSDDatoSaludOpcion, descripcion, fechaRegistro)
		SELECT  @idDeceSociodemografico, di.idDeceSDDatoSaludOpcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson,'$.datoS')
		WITH(
			idDeceSDDatoSaludOpcion	INT '$.idDeceSDDatoSaludOpcion'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDDatoSalud sd WHERE sd.idDeceSDDatoSalud = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--================================================================================================================================================================
--================================================================================================================================================================
--================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDDatoSaludUpdate') IS NOT NULL
	DROP PROC uspDeceSDDatoSaludUpdate
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDEmbarazoPartoUpdate '', '{"id":1}','{"idDeceSDEmbarazoParto":0,"idDeceSociodemografico":1,"idDeceSDEmbarazoPartoOpcion":8,"antep":[{"idDeceSDAntecedentePatologicoFamiliaOpcion":2,"codigo":2,"opcionTipo":4,"atributoName":"","nombrePropiedad":"hipertension","descripcion":"Hipertensión","fechaRegistro":"2022-05-26T16:17:43.187","estado":true}],"antecedenteEducacional":[{"idDeceSDAntecedenteDificultadEscolarOpcion":5,"codigo":5,"opcionTipo":2,"atributoName":"","nombrePropiedad":"problemaAtencion","descripcion":"Problemas de Atención","fechaRegistro":"2022-05-26T16:18:10.167","estado":true}],"descripcion":null,"pesoNacer":"12 libras","tallaNacer":"18 cm","edadCaminar":1,"edadHablar":2,"periodoLactancia":"6 meses","edadUsoBiberon":2,"edadControlEsfinter":2,"sufrioEnuresis":"NO","fechaRegistro":"2022-05-30T10:25:09.427"}'
-- select * from DeceSDDatoNinioRecienNacido
CREATE PROC uspDeceSDDatoSaludUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	BEGIN TRAN 

		DELETE dei FROM dbo.DeceSDDatoSalud dei
		WHERE dei.idDeceSociodemografico = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.datoS') 
			WITH ( idDeceSDDatoSaludOpcion	INT '$.idDeceSDDatoSaludOpcion' )	AS di
			WHERE dei.idDeceSDDatoSaludOpcion = di.idDeceSDDatoSaludOpcion
		)

		INSERT INTO dbo.DeceSDDatoSalud(idDeceSociodemografico, idDeceSDDatoSaludOpcion, descripcion, fechaRegistro )

		SELECT @id, di1.idDeceSDDatoSaludOpcion,'', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.datoS') 
		WITH (
			idDeceSDDatoSaludOpcion	INT '$.idDeceSDDatoSaludOpcion'
			
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceSDDatoSalud di2
			WHERE  di2.idDeceSociodemografico = @id
			AND di2.idDeceSDDatoSaludOpcion = di1.idDeceSDDatoSaludOpcion
			)
		
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO
--================================================================================================================================================================
--================================================================================================================================================================
--================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDHistoriaEducacionalInsert') IS NOT NULL
	DROP PROC uspDeceSDHistoriaEducacionalInsert
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDHistoriaEducacionalInsert '', '{"idDeceSDHistoriaEducacional":0,"idDeceSociodemografico":18,"histE":[{"idDeceSDHistoriaEducacionalOpcion":2,"codigo":2,"opcionTipo":4,"atributoName":"","nombrePropiedad":"gradoRepetido","descripcion":"¿Ha repetido algún año?","fechaRegistro":"2022-04-22T10:38:23.14","estado":true},{"idDeceSDHistoriaEducacionalOpcion":5,"codigo":5,"opcionTipo":4,"atributoName":"","nombrePropiedad":"clubes","descripcion":"Clubes","fechaRegistro":"2022-04-22T10:38:23.14","estado":true}],"descripcion":null,"fechaRegistro":"0001-01-01T00:00:00"}'
CREATE PROC uspDeceSDHistoriaEducacionalInsert
@authClientJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX)  = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)
	
	BEGIN TRAN 

		SELECT @idDeceSociodemografico = di.idDeceSociodemografico
		FROM OPENJSON(@dataFormJson) 
		WITH (
			idDeceSociodemografico							INT '$.idDeceSociodemografico'
		)	AS di

		--select *from [DeceSDHistoriaEducacional] where idDeceSociodemografico=18
		INSERT INTO [dbo].[DeceSDHistoriaEducacional](idDeceSociodemografico, idDeceSDHistoriaEducacionalOpcion, descripcion, fechaRegistro)
		SELECT  @idDeceSociodemografico, di.idDeceSDHistoriaEducacionalOpcion, '', @fechaHoy
		FROM OPENJSON (@dataFormJson,'$.histE')
		WITH(
			idDeceSDHistoriaEducacionalOpcion	INT '$.idDeceSDHistoriaEducacionalOpcion'
		) AS di

		SET @id = @@IDENTITY

		IF NOT EXISTS (SELECT 1 FROM dbo.DeceSDHistoriaEducacional sd WHERE sd.idDeceSDHistoriaEducacional = @id)
			BEGIN 
				SET @message = 'Problemas al guardar los cambios'
				GOTO CONTROL_ERROR
			END
	
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO

--=================================================================================================================================================================
--=================================================================================================================================================================
--=================================================================================================================================================================
GO
IF OBJECT_ID('uspDeceSDHistoriaEducacionalUpdate') IS NOT NULL
	DROP PROC uspDeceSDHistoriaEducacionalUpdate
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 26-04-2022 
-- Description:	
-- =============================================
-- uspDeceSDHistoriaEducacionalUpdate '', '{"id":1}','{"idDeceSDEmbarazoParto":0,"idDeceSociodemografico":1,"idDeceSDEmbarazoPartoOpcion":8,"antep":[{"idDeceSDAntecedentePatologicoFamiliaOpcion":2,"codigo":2,"opcionTipo":4,"atributoName":"","nombrePropiedad":"hipertension","descripcion":"Hipertensión","fechaRegistro":"2022-05-26T16:17:43.187","estado":true}],"antecedenteEducacional":[{"idDeceSDAntecedenteDificultadEscolarOpcion":5,"codigo":5,"opcionTipo":2,"atributoName":"","nombrePropiedad":"problemaAtencion","descripcion":"Problemas de Atención","fechaRegistro":"2022-05-26T16:18:10.167","estado":true}],"descripcion":null,"pesoNacer":"12 libras","tallaNacer":"18 cm","edadCaminar":1,"edadHablar":2,"periodoLactancia":"6 meses","edadUsoBiberon":2,"edadControlEsfinter":2,"sufrioEnuresis":"NO","fechaRegistro":"2022-05-30T10:25:09.427"}'
-- select * from DeceSDDatoNinioRecienNacido
CREATE PROC uspDeceSDHistoriaEducacionalUpdate
 @authClientJson NVARCHAR(MAX) = NULL
,@identifierFormJson NVARCHAR(MAX) = NULL
,@dataFormJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
	@gestion INT
,	@idsucursal INT
,	@idUsuario INT
,	@idRol INT
,	@id INT
,	@fechaHoy DATETIME = dbo.F_ObtieneFechaHoraActualEcuador()
,	@message VARCHAR(500) = ''
,	@idDeceSociodemografico INT
,	@nombreRol VARCHAR(50)=''
,	@nombreUsuario VARCHAR(50)=''

BEGIN TRY
	
	SELECT @gestion = gestion 
		,	@idsucursal = idsucursal
		,	@idUsuario = idUsuario
		,	@idRol = idRol
		,	@nombreUsuario= nombreUsuario 
 		,	@nombreRol= nombreRol

	FROM OPENJSON(@authClientJson) 
	WITH (
		gestion		INT '$.gestion'
	,	idSucursal	INT '$.idSucursal'
	,	idUsuario	INT '$.idUsuario'		
	,	idRol		INT '$.idRol'
	,	nombreUsuario	VARCHAR(50) '$.nombreUsuario'
	,	nombreRol		VARCHAR(50) '$.nombreRol'
	)

	SELECT @id = id
		FROM OPENJSON(@identifierFormJson) 
		WITH (
			id	INT    '$.id'
		)

	BEGIN TRAN 

		DELETE dei FROM dbo.DeceSDHistoriaEducacional dei
		WHERE dei.idDeceSociodemografico = @id
		AND  NOT EXISTS(
		SELECT 1 FROM OPENJSON(@dataFormJson, '$.histE') 
			WITH ( idDeceSDHistoriaEducacionalOpcion	INT '$.idDeceSDHistoriaEducacionalOpcion' )	AS di
			WHERE dei.idDeceSDHistoriaEducacionalOpcion = di.idDeceSDHistoriaEducacionalOpcion
		)
		
		INSERT INTO dbo.DeceSDHistoriaEducacional(idDeceSociodemografico, idDeceSDHistoriaEducacionalOpcion, descripcion, fechaRegistro )

		SELECT @id, di1.idDeceSDHistoriaEducacionalOpcion,'', @fechaHoy
		FROM OPENJSON(@dataFormJson, '$.histE') 
		WITH (
			idDeceSDHistoriaEducacionalOpcion	INT '$.idDeceSDHistoriaEducacionalOpcion'
			
		)	AS di1
		
		WHERE NOT EXISTS ( SELECT 1 FROM dbo.DeceSDHistoriaEducacional di2
			WHERE  di2.idDeceSociodemografico = @id
			AND di2.idDeceSDHistoriaEducacionalOpcion = di1.idDeceSDHistoriaEducacionalOpcion
			)
		
	COMMIT TRAN 
	/*No cambiar nombre de propiedad (payload) debido que con el nombre lo recupera el BackEnd*/
	SELECT '1' , 'Cambios guardado exitosamente' , '' , @id AS payload
	RETURN
END TRY
BEGIN CATCH
	INSERT INTO dbo.ErroresSP (Identificador, NombreObjeto, ErrorNumber, ErrorSeverity, ErrorState, ErrorProcedure, ErrorLine, ErrorMessage, ErrorDateTime, idSucursal, idUsuario, idRol)
	VALUES (NEWID(), ISNULL(ERROR_PROCEDURE(),''), ISNULL(@@ERROR,0), ISNULL(ERROR_SEVERITY(),''), ISNULL(ERROR_STATE(),0), ISNULL(ERROR_PROCEDURE(),''), ISNULL(ERROR_LINE(),0), ISNULL(ERROR_MESSAGE(),'') +' - custom message: '+ @message, @fechaHoy, @idSucursal, @idUsuario, @idRol)	
		
	SET @message = 'Problemas al guardar los cambios'
	GOTO CONTROL_ERROR
END CATCH
CONTROL_ERROR:
	BEGIN
		IF @@TRANCOUNT > 0 ROLLBACK TRAN
		SELECT '0', ISNULL(@message,'Oops! Tenemos problemas intentalo nuevamente'), ''
		RETURN
	END
END
GO



GO
IF OBJECT_ID('uspLogin') IS NOT NULL
	DROP PROC uspLogin
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspLogin 0, 0, 0, 0
CREATE PROC [dbo].[uspLogin]
@authClientJson NVARCHAR(MAX) = NULL

AS 
BEGIN 
DECLARE 
@urlRedirect VARCHAR(10) ='/#/'
,@id INT



	/*validar usuario*/


	/*validar accesos*/


	/*recuperar data*/

	SELECT
		'1'
	,	''
	,	''
	--,(SELECT [urlRedirect]=@urlRedirect,
	--		 [accesos]	=JSON_QUERY('[' + STUFF(( SELECT',' + '"'+m.url+ '"' FROM dbo.Menu m FOR XML PATH('')),1,1,'') + ']' )
	-- FOR JSON PATH,WITHOUT_ARRAY_WRAPPER) as payload
	,( SELECT 
		mn.[idMenu] 	
	,	mn.[descripcion]
	,	mn.[url]
	,	mn.[icon]
	FROM dbo.Menu mn
	 FOR JSON PATH) as payload	 
END
GO

------------------------------------------------------------------------------------------------------------------------------------------
GO
IF OBJECT_ID('uspLoginMenuListar') IS NOT NULL
	DROP PROC uspLoginMenuListar
GO
-- =============================================
-- Author:		Jefferson Mena - 
-- Create date: 
-- Description:	
-- =============================================
-- uspLoginMenuListar 0
CREATE PROC uspLoginMenuListar
@idRol INT
AS 
BEGIN 
	SELECT 
		ma.idMenuAcceso
	,	m.idMenu
	,	m.descripcion
	,	m.url
	,	ISNULL(m.icon, '')	
	FROM dbo.MenuAcceso ma
	INNER JOIN dbo.Menu m ON m.idMenu = ma.idMenu
	WHERE ma.idRol = @idRol /* devuelve menus de rol especifico */
END
GO
IF OBJECT_ID('uspLoginRolListar') IS NOT NULL
	DROP PROC uspLoginRolListar
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 
-- Description:	
-- =============================================
-- uspLoginRolListar 0
CREATE PROC uspLoginRolListar
@idUsuario INT
AS
BEGIN
SELECT 
		a.idAcceso
	,	a.idSucursal
	,	a.predeterminado
	,	u.idUsuario
	,	u.codUsuario
	,	u.contrasena
	,	u.nombreCompleto
	,	r.idRol
	,	r.descripcion
	FROM dbo.Acceso a
	INNER JOIN dbo.Rol r ON r.idRol = a.idRol
	INNER JOIN dbo.Usuario u ON u.idUsuario = a.idUsuario
	WHERE a.idUsuario = @idUsuario /* devuelve todos los roles de un usuario*/	
END
GO
IF OBJECT_ID('uspLogin') IS NOT NULL
	DROP PROC uspLogin
GO
-- =============================================
-- Author:		Jefferson Mena
-- Create date: 13-04-2022 
-- Description:	
-- =============================================
-- uspLogin 0, 0, 0, 0
CREATE PROC [dbo].[uspLogin]
@authClientJson NVARCHAR(MAX) = NULL
AS 
BEGIN 
DECLARE 
	@urlRedirect VARCHAR(10) ='/'
,	@codUsuario VARCHAR(50)
,	@contrasena VARCHAR(MAX)
,	@idUsuario INT
,	@idRol INT

BEGIN TRY 


	SELECT	@codUsuario = codUsuario 
		,	@contrasena = contrasena
	FROM OPENJSON (@authClientJson)
	WITH(
		codUsuario	VARCHAR(50) '$.codUsuario'
	,	contrasena	 VARCHAR(MAX) '$.contrasena'
	)

	/* Aplicar luego claves simetrica y asimetrica   **************** OJOOOOO **************** */
	SET @contrasena = (LOWER(CONVERT(NVARCHAR(32),HASHBYTES('MD5', LTRIM(RTRIM(CONVERT(VARCHAR,@contrasena )))),2))) --MD5

	/*validar usuario*/ /* RESPETAR MINUSCULAS CON MAYUSCULAS   */
	IF NOT EXISTS (SELECT 1 FROM dbo.Usuario WHERE codUsuario = @codUsuario)
		BEGIN 
			SELECT '0','Usuario invalido',''
			RETURN 
		END

	IF NOT EXISTS (SELECT 1 FROM dbo.Usuario WHERE codUsuario = @codUsuario AND contrasena = @contrasena)
		BEGIN 
			SELECT '0','Credenciales incorrectas',''
			RETURN 
		END

	IF NOT EXISTS (SELECT 1 FROM dbo.Usuario WHERE codUsuario = @codUsuario AND contrasena = @contrasena AND estado = 1)
		BEGIN 
			SELECT '0','Usuario deshabilitado',''
			RETURN 
		END

	SELECT @idUsuario = idUsuario FROM dbo.Usuario WHERE codUsuario = @codUsuario AND contrasena = @contrasena 
	
	/*validar accesos*/
	IF NOT EXISTS(SELECT 1 FROM dbo.Acceso ac 
					WHERE ac.idUsuario = @idUsuario
					AND ac.fechaBaja IS NULL)
		BEGIN 
			SELECT '0','Usuario sin permisos otorgados',''
			RETURN 
		END

	IF NOT EXISTS(SELECT 1 FROM dbo.Acceso ac 
					WHERE ac.idUsuario = @idUsuario
					AND ac.fechaBaja IS NULL
					AND ac.predeterminado = 1)
		BEGIN 
			SELECT '0','Usuario sin permisos otorgados',''
			RETURN 
		END

	SELECT @idRol = ac.idRol FROM dbo.Acceso ac WHERE ac.idUsuario = @idUsuario AND ac.fechaBaja IS NULL AND ac.predeterminado = 1

	/* acceso menu*/
	IF NOT EXISTS(SELECT 1 FROM dbo.MenuAcceso mc
					WHERE mc.idRol = @idRol)
		BEGIN 
			SELECT '0','Usuario sin accesos otorgados',''
			RETURN
		END	

	/*recuperar data*/
	
	--(SELECT [urlRedirect]=@urlRedirect,
	--		 [accesos]	=JSON_QUERY('[' + STUFF(( SELECT',' + '"'+m.url+ '"' FROM dbo.Menu m FOR XML PATH('')),1,1,'') + ']' )
	-- FOR JSON PATH,WITHOUT_ARRAY_WRAPPER) as payload
	


	SELECT '1',	'Verificación exitosa',	'LogIn' 
	
	,	a.idSucursal	
	,	u.idUsuario
	,	u.codUsuario
	,	u.contrasena /* codificada */
	,	u.nombreCompleto
	,	r.idRol
	,	r.descripcion
	,	@urlRedirect
	FROM dbo.Acceso a
	INNER JOIN dbo.Rol r ON r.idRol = a.idRol
	INNER JOIN dbo.Usuario u ON u.idUsuario = a.idUsuario
	WHERE a.idRol = @idRol 
	AND a.idUsuario = @idUsuario /* devuelve rol especifico */
	AND a.predeterminado = 1

	--/*1ra consulta*/
	--EXEC uspLoginRolListar @idUsuario

	--/*2da consulta*/
	--EXEC uspLoginMenuListar @idRol

	RETURN
END TRY
BEGIN CATCH
	SELECT '0',	'Error al ingresar: '+ ERROR_MESSAGE(),	'LogIn'
	RETURN
END CATCH
END
GO