package com.main.worklancer.Repositories;

import com.main.worklancer.Models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {
}
