export class GlobalConstants {
    // BaseApi
    public static baseApiUrl: string = "http://localhost";
    
    // Mantenedor Constants
    public static createButtonName: string = "+ Agregar";

    // Table Constants
    public static searchPlaceHolder: string = "Filtrar...";
    public static noSearchResults: string = "No existen resultados para su búsqueda.";
    public static pageSizeOptions: number[] = [10, 20, 50, 100];

    // Modal Constants
    public static modalConfig: any = { width: '100%', position: { top: '3%' } };
    public static closeButtonName: string = "Cerrar";
    public static saveButtonName: string = "Guardar";

    // Toastr Titles
    public static successToast: string = "Acción completada:";
    public static warningToast: string = "No se pudo completar la acción:";
    public static errorToast: string = "Se ha producido un error:";

    // Map
    public static lixibanffp4m : string = "AIzaSyB2Kls3RdCM6R3G5CUI_1-Z_hs5Sb5hlPw";
    public static initMapLatLng : google.maps.LatLng = new google.maps.LatLng(-33.43593980261049, -70.67106719480667);
}