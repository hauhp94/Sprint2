import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news/news.service';
import {Title} from '@angular/platform-browser';
import {News} from '../../../model/news/news';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: News[] = [];
  news1: News[] = [];
  news2: News[] = [];
  isLoggedIn = false;

  constructor(private newsService: NewsService, private titleService: Title,
              private tokenStorageService: TokenStorageService) {
    this.titleService.setTitle('Tin tức');
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }
  }

  ngOnInit(): void {
    this.getNewsLimit10();
    this.getNewsLimit5();
    this.getNewsMore();
  }

  getNewsLimit10() {
    this.newsService.getNewsLimit10().subscribe(value => {
      this.news = value;
    });
  }

  getNewsLimit5() {
    this.newsService.getNewsLimit5().subscribe(value => {
      this.news1 = value;
    });
  }

  getNewsMore() {
    this.newsService.getNewsMore().subscribe(value => {
      this.news2 = value;
    });
  }
}
