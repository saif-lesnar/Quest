import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
    selector : 'member-detail',
    templateUrl : 'member-detail.component.html',
    styleUrls : ['member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
    user : User;
    galleryOptions : NgxGalleryOptions[];
    galleryImages : NgxGalleryImage[];
    /**
     *
     */
    constructor(private userService : UserService,
        private route : ActivatedRoute) {
        
    }
    ngOnInit() {
        this.loadUser();
        this.galleryOptions = [
            {
                width : '500px',
                height : '500px',
                imagePercent : 100,
                thumbnailsColumns : 4,
                imageAnimation : NgxGalleryAnimation.Slide,
                preview : false
            }
        ];
        this.galleryImages = this.getImages();
    }
    getImages(){
        debugger;
        const imageUrls = [];
        for (const photo of this.user.photos) {
            imageUrls.push({
                small : photo.url,
                medium : photo.url,
                big : photo.url,
                description : photo.description,
            });
        }
        return imageUrls;
    }
    loadUser(){
        this.route.data.subscribe(data => {
            this.user = data['user'];
        })
    }

}