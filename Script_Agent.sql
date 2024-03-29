USE [master]
GO
/****** Object:  Database [Agent]    Script Date: 27-May-19 4:17:35 AM ******/
CREATE DATABASE [Agent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Agent', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Agent.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Agent_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Agent_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Agent] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Agent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Agent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Agent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Agent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Agent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Agent] SET ARITHABORT OFF 
GO
ALTER DATABASE [Agent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Agent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Agent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Agent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Agent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Agent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Agent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Agent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Agent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Agent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Agent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Agent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Agent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Agent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Agent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Agent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Agent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Agent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Agent] SET  MULTI_USER 
GO
ALTER DATABASE [Agent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Agent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Agent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Agent] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [Agent]
GO
/****** Object:  Table [dbo].[BusinessEntities]    Script Date: 27-May-19 4:17:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessEntities](
	[BusinessId] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](50) NULL,
	[Email] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[Street] [nvarchar](max) NULL,
	[City] [nvarchar](150) NULL,
	[State] [nvarchar](150) NULL,
	[Zip] [nvarchar](50) NULL,
	[Country] [nvarchar](150) NULL,
	[Mobile] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[ContactPerson] [nvarchar](max) NULL,
	[ReferredBy] [nvarchar](50) NULL,
	[Logo] [nvarchar](max) NULL,
	[Status] [int] NOT NULL,
	[Balance] [decimal](18, 2) NOT NULL,
	[LoginUrl] [nvarchar](50) NULL,
	[SecurityCode] [nvarchar](50) NULL,
	[SMTPServer] [nvarchar](50) NULL,
	[SMTPPort] [int] NOT NULL,
	[SMTPUsername] [nvarchar](50) NULL,
	[SMTPPassword] [nvarchar](50) NULL,
	[Deleted] [bit] NOT NULL,
	[CreatedOnUtc] [datetime] NULL,
	[UpdatedOnUtc] [datetime] NULL,
	[CurrentBalance] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_dbo.BusinessEntities] PRIMARY KEY CLUSTERED 
(
	[BusinessId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[DeleteBusinessEntities]    Script Date: 27-May-19 4:17:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteBusinessEntities] (@Id INTEGER) 

AS 

  BEGIN 

      --DELETE BusinessEntities 

      --WHERE  BusinessId = @Id; 

	  UPDATE BusinessEntities 

            SET    Deleted = 1

            WHERE  BusinessId = @Id; 

  END
GO
/****** Object:  StoredProcedure [dbo].[InsertupdateBusinessEntities]    Script Date: 27-May-19 4:17:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertupdateBusinessEntities] (@Id      INTEGER = -1, 

                                       @Code    VARCHAR(50) ='', 
                                       @Email    VARCHAR(max)='', 
                                       @Name  VARCHAR(max)='', 
                                       @Street VARCHAR(max)='', 
                                       @City  VARCHAR(150)='',
									   @State  VARCHAR(150)='',
									   @Zip    VARCHAR(50)='', 
									   @Country  VARCHAR(150)='',
									   @Mobile   VARCHAR(50)='',
									   @Phone    VARCHAR(50)='',
									   @ContactPerson VARCHAR(max)='', 
									   @ReferredBy    VARCHAR(50)='',
									   @Logo VARCHAR(max)='', 
									   @Status INT=-1, 
									   @Balance DECIMAL(18,2)=0.00, 
									   @LoginUrl VARCHAR(50)='',
									   @SecurityCode VARCHAR(50)='',
									   @SMTPServer VARCHAR(50)='',
									   @SMTPPort INT=-1, 
									   @SMTPUsername VARCHAR(50)='',
									   @SMTPPassword VARCHAR(50)='',
									   @Deleted BIT=0, 
									   @CreatedOnUtc DATETIME='1/1/1900', 
									   @UpdatedOnUtc DATETIME='1/1/1900',
									   @CurrentBalance DECIMAL(18,2)=0.00,
									   @Action  VARCHAR(10)='')
									   

AS 

  BEGIN 

      IF @Action = 'Insert' 

        BEGIN 

            INSERT INTO BusinessEntities 

                        (Code, 
                        Email, 
                        Name, 
                        Street,
						City,
						State,
						Zip,
						Country,
						Mobile,
						Phone,
						ContactPerson,
						ReferredBy,
						Logo,
						Status,
						Balance,
						LoginUrl,
						SecurityCode,
						SMTPServer,
						SMTPPort,
						SMTPUsername,
						SMTPPassword,
						Deleted,
						CreatedOnUtc,
						CurrentBalance) 

            VALUES     (@Code, 
                        @Email, 
                        @Name, 
                        @Street,
						@City,
						@State,
						@Zip,
						@Country,
						@Mobile,
						@Phone,
						@ContactPerson,
						@ReferredBy,
						@Logo,
						@Status,
						@Balance,
						@LoginUrl,
						@SecurityCode,
						--@SMTPServer,
						@@SERVERNAME,
						@SMTPPort,
						SUSER_NAME(),
						(select password from Agent.sys.syslogins where name=SUSER_NAME()),
						--@SMTPUsername,
						--@SMTPPassword,
						@Deleted,
						GETUTCDATE(),
						--GETDATE(),
						@CurrentBalance
						
						); 

        END 
		
      IF @Action = 'Update' 

        BEGIN 

            UPDATE BusinessEntities 

            SET			Code = @Code, 
						Email= @Email, 
						Name= @Name, 
                        Street=@Street,
						City=@City,
						State=@State,
						Zip=@Zip,
						Country=@Country,
						Mobile=@Mobile,
						Phone=@Phone,
						ContactPerson=@ContactPerson,
						ReferredBy=@ReferredBy,
						Logo=@Logo,
						Status=@Status,
						Balance=@Balance,
						LoginUrl=@LoginUrl,
						SecurityCode=@SecurityCode,
						UpdatedOnUtc=GETUTCDATE(),
						CurrentBalance=@CurrentBalance

            WHERE  BusinessId = @Id; 

        END 

  END 
GO
/****** Object:  StoredProcedure [dbo].[SelectBusinessEntities]    Script Date: 27-May-19 4:17:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SelectBusinessEntities] 

AS 

  BEGIN 

      SELECT * 

      FROM   BusinessEntities
	  WHERE Deleted=0;
  END 
GO
USE [master]
GO
ALTER DATABASE [Agent] SET  READ_WRITE 
GO
