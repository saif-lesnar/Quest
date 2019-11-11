import { environment } from './../../../environments/environment';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/_services/user.service';
@Component({
    selector : 'photo-editor',
    templateUrl : 'photo-editor.component.html',
    styleUrls : ['photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit{
    @Input() photos : Photo[];
     uploader:FileUploader;
     hasBaseDropZoneOver:boolean = false;
     baseUrl = environment.apiUrl;
     /**
      *
      */
     constructor(private authService : AuthService,
        private userService : UserService) {
         
     }
    ngOnInit() {
        this.initUploader()
    }

    fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
    initUploader(){
        this.uploader = new FileUploader({
            url : this.baseUrl+'user/'+this.authService.decodedToken.nameid+'/photos',
            authToken : 'Bearer '+ localStorage.getItem('token'),
            isHTML5 : true,
            allowedFileType : ['image'],
            removeAfterUpload : true,
            autoUpload : false,
            maxFileSize : 10*1024*1024
        });
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onSuccessItem = (item, response, status, headers) =>{
            if(response){
                const res : Photo = JSON.parse(response);
                const photo = {
                    id: res.id,
                    url : res.url, 
                    dateAdded : res.dateAdded,
                    description : res.description,
                    isMain : res.isMain
                };
                this.photos.push(photo);
            }
        }
    }
    setMainPhoto(photo : Photo){
        this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=>{
            console.log("succesfully updated photo");
        }, error =>{
            console.log("failed to set main photo");            
        });
    }
}