import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movies = [];
  currentPage = 1;
  imageBaseUrl= environment.images;
  constructor(private movieSevice: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() 
  {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent)
  {
    const loading = await this.loadingCtrl.create({
      message: "Loading...",
      spinner: "bubbles"
    })
    await loading.present();
    this.movieSevice.getTopRatedMovies(this.currentPage).subscribe((res) =>{
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);
      event?.target.complete();
      if(event)
      {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent)
  {
    this.currentPage++;
    this.loadMovies(event);
  }
}
